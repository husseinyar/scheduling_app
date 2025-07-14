"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/hooks/use-language"

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === "sv" ? "en" : "sv")
  }

  return (
    <Button variant="ghost" size="sm" onClick={toggleLanguage}>
      {language === "sv" ? "🇬🇧 English" : "🇸🇪 Svenska"}
    </Button>
  )
}
