// src/main/components/Search/useSearch.ts
import { useState, useCallback } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { SearchProposition } from '@/main/lib/directus'
import { getSearchSuggestions } from '@/main/lib/actions'
import { Lang } from '@/main/lib/dictionaries/types'
import { createSearchUrl } from '@/main/lib/utils'

export function useSearch() {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSearchSubmit = useCallback((): boolean => {
    const trimmedQuery = searchQuery.trim()
    if (trimmedQuery.length >= 3) {
      const lang = pathname.split('/')[1] as Lang
      const searchUrl = createSearchUrl(trimmedQuery, searchParams)
      router.push(`/${lang}${searchUrl}`)
      setSearchQuery('')
      setSuggestions([])
      setHasInteracted(false)
      return true
    }
    return false
  }, [searchQuery, pathname, router, searchParams])

  const handleSearch = useCallback(async (term: string) => {
    if (term.length >= 3) {
      try {
        const results = await getSearchSuggestions(term, pathname.split('/')[1] as Lang)
        setSuggestions(results)
      } finally {
        setIsSearching(false)
      }
    } else {
      setIsSearching(false)
      setSuggestions([])
    }
  }, [pathname])

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    const lang = pathname.split('/')[1] as Lang
    router.push(`/${lang}/${rubricSlug}/${slug}`)
    setSearchQuery('')
    setSuggestions([])
  }, [pathname, router])

  return {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    setSearchQuery,
    setSuggestions,
    setIsSearching,
    setHasInteracted,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
  }
}