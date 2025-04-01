"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function CategoriesSection() {
  const { t, language } = useLanguage()

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          {t("home.categories")}
        </span>
      </h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.categories.description")}</p>
    </div>
  )
}

export function ShopSection() {
  const { t } = useLanguage()

  return (
    <div>
      <h2 className="text-3xl font-bold mb-4">{t("home.visitShop")}</h2>
      <p className="text-muted-foreground mb-6">{t("home.visitShop.description")}</p>
      <Button asChild>
        <Link href="/contact">{t("home.findLocation")}</Link>
      </Button>
    </div>
  )
}

export function FeaturedProductsSection() {
  const { t, language, dir } = useLanguage()

  return (
    <div className="flex justify-between items-center mb-8">
      <h2 className="text-3xl font-bold">{t("home.featuredProducts")}</h2>
      <Button variant="outline" asChild>
        <Link href="/products" className="flex items-center">
          {t("products.viewAll")}
          <ArrowRight className={`${dir === "rtl" ? "mr-2 rtl-flip" : "ml-2"} h-4 w-4`} />
        </Link>
      </Button>
    </div>
  )
}

export function TestimonialsSection() {
  const { t } = useLanguage()

  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl font-bold mb-4">{t("home.testimonials")}</h2>
      <p className="text-muted-foreground max-w-2xl mx-auto">{t("home.testimonials.description")}</p>
    </div>
  )
}

export function TestimonialCard({ index }: { index: number }) {
  const { t } = useLanguage()

  return (
    <div className="flex items-center mb-4">
      <div className="mr-4">
        <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
          <span className="text-primary font-bold">{String.fromCharCode(64 + index)}</span>
        </div>
      </div>
      <div>
        <h4 className="font-semibold">{t("home.customerName")}</h4>
        <p className="text-sm text-muted-foreground">{t("home.loyalCustomer")}</p>
      </div>
    </div>
  )
}

