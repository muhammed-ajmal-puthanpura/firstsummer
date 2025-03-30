"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function NotFound() {
  const { t } = useLanguage()

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12 text-center">
      <h1 className="text-6xl font-bold mb-4">{t("notFound.title")}</h1>
      <h2 className="text-2xl font-semibold mb-6">{t("notFound.subtitle")}</h2>
      <p className="text-muted-foreground mb-8 max-w-md">{t("notFound.description")}</p>
      <Button asChild>
        <Link href="/">{t("notFound.returnHome")}</Link>
      </Button>
    </div>
  )
}

