import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft } from "lucide-react"
import ProductCard from "@/components/product-card"
import { createServerSupabaseClient } from "@/lib/supabase"

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const supabase = createServerSupabaseClient()

  // Get category based on slug
  const { data: category } = await supabase.from("categories").select("*").eq("slug", params.slug).single()

  if (!category) {
    return {
      title: "Category Not Found",
    }
  }

  return {
    title: `${category.name_en} | First Summer Electronics`,
    description: `Browse our collection of ${category.name_en.toLowerCase()}`,
  }
}

export const revalidate = 0 // This will revalidate on every request

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = params
  const supabase = createServerSupabaseClient()

  // Get category based on slug
  const { data: category, error: categoryError } = await supabase
    .from("categories")
    .select("*")
    .eq("slug", slug)
    .single()

  // If category doesn't exist, show 404
  if (categoryError || !category) {
    notFound()
  }

  // Get products for this category
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .eq("category_id", category.id)

  // Handle error
  if (productsError) {
    console.error("Error fetching products:", productsError)
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <Link href="/products" className="text-primary flex items-center hover:underline mb-4">
          <ChevronLeft className="mr-1 h-4 w-4" />
          Back to Categories
        </Link>
        <h1 className="text-4xl font-heading font-bold">{category.name_en}</h1>
        <p className="text-muted-foreground mt-2">Browse our collection of {category.name_en.toLowerCase()}</p>
      </div>

      {products && products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}

