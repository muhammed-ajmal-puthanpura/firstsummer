import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { createServerSupabaseClient } from "@/lib/supabase"

interface PageProps {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient()

  // Get product based on id
  const { data: product } = await supabase.from("products").select("*").eq("id", params.id).single()

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name_en} | First Summer Electronics`,
    description: product.description_en,
  }
}

export const revalidate = 0 // This will revalidate on every request

export default async function ProductPage({ params }: PageProps) {
  const { id } = params
  const supabase = createServerSupabaseClient()

  // Get product based on id
  const { data: product, error: productError } = await supabase.from("products").select("*").eq("id", id).single()

  // If product doesn't exist, show 404
  if (productError || !product) {
    notFound()
  }

  // Get category for this product
  const { data: category } = await supabase.from("categories").select("*").eq("id", product.category_id).single()

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/products" className="text-primary flex items-center hover:underline mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Products
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image
            src={product.image_url || "/placeholder.svg"}
            alt={product.name_en}
            fill
            className="object-contain"
            priority
          />
        </div>

        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-heading font-bold mb-2">{product.name_en}</h1>
          <h2 className="text-xl font-heading text-muted-foreground mb-4">{product.name_ar}</h2>

          <div className="flex flex-wrap gap-2 mb-6">
            <Badge variant="secondary">{product.brand}</Badge>
            <Badge variant="outline">{product.size_type}</Badge>
            {category && (
              <Badge variant="outline" className="bg-primary/10">
                {category.name_en}
              </Badge>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-muted-foreground">{product.description_en}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">الوصف</h3>
              <p className="text-muted-foreground font-arabic" dir="rtl">
                {product.description_ar}
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold mb-2">Specifications</h3>
              <ul className="space-y-2">
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Brand</span>
                  <span>{product.brand}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Size/Type</span>
                  <span>{product.size_type}</span>
                </li>
                <li className="flex justify-between border-b pb-2">
                  <span className="font-medium">Category</span>
                  <span>{category?.name_en || "Unknown"}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products section could be added here */}
    </div>
  )
}

