"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function LanguageToggle() {
  const [language, setLanguage] = useState<"ar" | "en">("ar")

  const toggleLanguage = (lang: "ar" | "en") => {
    setLanguage(lang)
    // In a real implementation, you would store this in localStorage
    // and implement a more robust language switching mechanism
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          {language === "ar" ? "العربية" : "English"}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => toggleLanguage("ar")}>العربية</DropdownMenuItem>
        <DropdownMenuItem onClick={() => toggleLanguage("en")}>English</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

