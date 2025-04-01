"use client"
import Link from "next/link"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

interface Product {
  id: number
  name_ar: string
  name_en: string
  brand: string
  size_type: string
  image_url: string
  category_id: number
}

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { language } = useLanguage()
  const fontClass = language === "ar" ? "font-arabic" : "font-sans"

  // Display name based on current language
  const displayName = language === "ar" ? product.name_ar : product.name_en

  return (
    <Link href={`/products/product/${product.id}`}>
      <Card className={`overflow-hidden group ${fontClass} hover:shadow-md transition-all`}>
        <div className="relative aspect-square overflow-hidden">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={displayName}
            fill
            className="object-cover transition-transform group-hover:scale-105"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-lg mb-1 line-clamp-1">{displayName}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge variant="secondary">{product.brand}</Badge>
            <Badge variant="outline">{product.size_type}</Badge>
          </div>
        </CardContent>
      </Card>
    </Link>
  )
}

