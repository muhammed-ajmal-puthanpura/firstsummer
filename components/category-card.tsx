"use client"

import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface Category {
  id: string
  slug: string
  name_ar: string
  name_en: string
  image_url: string
  count?: number
}

interface CategoryCardProps {
  category: Category
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const { language } = useLanguage()
  const fontClass = language === "ar" ? "font-arabic" : "font-sans"

  // Display name based on current language
  const displayName = language === "ar" ? category.name_ar : category.name_en

  // Make sure the link uses the slug parameter
  return (
    <Link href={`/products/${category.slug}`}>
      <Card className={`overflow-hidden transition-all hover:shadow-md ${fontClass}`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={category.image_url || "/placeholder.svg"}
            alt={displayName}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
            <h3 className="font-bold text-xl">{displayName}</h3>
            {category.count !== undefined && (
              <p className="text-sm opacity-90">
                {category.count} {language === "ar" ? "منتج" : "products"}
              </p>
            )}
          </div>
        </div>
      </Card>
    </Link>
  )
}

