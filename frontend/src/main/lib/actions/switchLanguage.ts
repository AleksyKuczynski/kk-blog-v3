// src/main/lib/actions/switchLanguage.ts
'use server'

import { cookies } from "next/headers"
import { Lang } from "../dictionaries/dictionariesTypes"
import { redirect } from "next/navigation"

export async function switchLanguage(lang: Lang, fullPath: string) {
  cookies().set('NEXT_LOCALE', lang)
  redirect(fullPath)
}