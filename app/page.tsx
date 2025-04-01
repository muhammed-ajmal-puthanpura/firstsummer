import type { Metadata } from "next"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import CategoryCard from "@/components/category-card"
import HeroSection from "@/components/hero-section"
import ProductCard from "@/components/product-card"
import {
  CategoriesSection,
  ShopSection,
  FeaturedProductsSection,
  TestimonialsSection,
  TestimonialCard,
} from "@/components/home-sections"
import { createServerSupabaseClient } from "@/lib/supabase"

export const metadata: Metadata = {
  title: "First Summer | Electronics",
  description: "Your premier destination for high-quality electronics",
}

// Update the revalidation to ensure fresh data
export const revalidate = 0 // This will revalidate on every request

export default async function Home() {
  const supabase = createServerSupabaseClient()

  // Fetch categories
  const { data: categories, error: categoriesError } = await supabase.from("categories").select("*")

  // Fetch featured products (limit to 6)
  const { data: products, error: productsError } = await supabase.from("products").select("*").limit(6)

  // Handle errors
  if (categoriesError || productsError) {
    console.error("Error fetching data:", categoriesError || productsError)
  }

  return (
    <div className="flex flex-col gap-16 pb-16">
      {/* Hero Section */}
      <HeroSection />

      {/* Categories Section */}
      <section className="container">
        <CategoriesSection />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {categories?.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Shop Interior Section */}
      <section className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <ShopSection />
          <div className="relative h-[400px] rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=800&width=1200" alt="Shop Interior" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <FeaturedProductsSection />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products?.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="container">
        <TestimonialsSection />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((item) => (
            <Card key={item} className="bg-background border">
              <CardContent className="p-6">
                <TestimonialCard index={item} />
                <p className="italic text-muted-foreground">
                  "I've been shopping at First Summer Electronics for years. Their product selection and customer
                  service are unmatched. Highly recommended!"
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  )
}

