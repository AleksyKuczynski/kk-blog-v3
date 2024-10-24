// src/main/components/Search/useSearch.ts
import { useState, useCallback } from 'react'
import { useRouter, usePathname } from 'next/navigation'
import { SearchProposition } from '@/main/lib/directus'
import { getSearchSuggestions } from '@/main/lib/actions'
import { Lang } from '@/main/lib/dictionaries/types'

export function useSearch(onSubmit?: () => void) {
  const [searchQuery, setSearchQuery] = useState('')
  const [suggestions, setSuggestions] = useState<SearchProposition[]>([])
  const [hasInteracted, setHasInteracted] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = useCallback(async (term: string) => {
    setSearchQuery(term)
    setHasInteracted(true)
    
    if (term.length >= 3) {
      setIsSearching(true)
      try {
        const results = await getSearchSuggestions(term, pathname.split('/')[1] as Lang)
        setSuggestions(results)
      } finally {
        setIsSearching(false)
      }
    } else {
      setSuggestions([])
    }
  }, [pathname])

  const handleSelect = useCallback((slug: string, rubricSlug: string) => {
    const lang = pathname.split('/')[1] as Lang
    router.push(`/${lang}/${rubricSlug}/${slug}`)
    setSearchQuery('')
    setSuggestions([])
    setHasInteracted(false)
  }, [pathname, router])

  const handleSearchSubmit = useCallback(() => {
    if (searchQuery.trim().length >= 3) {
      const lang = pathname.split('/')[1] as Lang
      const encodedQuery = encodeURIComponent(searchQuery.trim())
      router.push(`/${lang}/search?search=${encodedQuery}`)
      setHasInteracted(false)
      onSubmit?.()
    }
  }, [searchQuery, pathname, router, onSubmit])

  return {
    searchQuery,
    suggestions,
    hasInteracted,
    isSearching,
    handleSearch,
    handleSelect,
    handleSearchSubmit,
  }
}