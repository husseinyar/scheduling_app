"use client"

import { useLanguage } from "./use-language"
import translations from "@/lib/data/translations.json"

type Translations = typeof translations
type Language = keyof Translations
type TranslationKey = keyof Translations['en'] | keyof Translations['sv']

export const useTranslation = () => {
  const { language } = useLanguage()

  const t = (key: string): string => {
    const keys = key.split('.')
    let result: any = translations[language as Language]

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k]
      } else {
        return key
      }
    }

    return typeof result === 'string' ? result : key
  }

  return { t, lang: language }
}
