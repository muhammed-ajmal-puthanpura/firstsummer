import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const category = request.nextUrl.searchParams.get("category")

    let query = supabase.from("products").select("*")

    if (category) {
      // First get the category ID from the slug
      const { data: categoryData } = await supabase.from("categories").select("id").eq("slug", category).single()

      if (categoryData) {
        query = query.eq("category_id", categoryData.id)
      }
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerSupabaseClient()
    const product = await request.json()

    // Validate required fields
    if (!product.name_ar || !product.name_en || !product.category_id || !product.brand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const { data, error } = await supabase
      .from("products")
      .insert({
        ...product,
        created_at: new Date().toISOString(),
      })
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json(data[0])
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

