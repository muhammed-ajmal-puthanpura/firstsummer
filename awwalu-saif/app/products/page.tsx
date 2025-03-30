import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { createServerSupabaseClient } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "Products | First Summer Electronics",
  description: "Browse our wide range of electronic products",
}

export const revalidate = 3600 // Revalidate every hour

export default async function ProductsPage() {
  const supabase = createServerSupabaseClient()

  // Fetch categories
  const { data: categories, error } = await supabase.from("categories").select("*")

  // Handle error
  if (error) {
    console.error("Error fetching categories:", error)
  }

  return (
    <div className="container py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-heading font-bold mb-4">Our Products</h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Browse our wide range of high-quality electronic products across various categories.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {categories?.map((category) => (
          <Link key={category.id} href={`/products/${category.slug}`}>
            <Card className="overflow-hidden transition-all hover:shadow-md h-full">
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={category.image_url || "/placeholder.svg"}
                  alt={category.name_en}
                  fill
                  className="object-cover transition-transform hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="font-heading font-bold text-2xl mb-2">{category.name_en}</h2>
                  <Button>Browse {category.name_en}</Button>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}

