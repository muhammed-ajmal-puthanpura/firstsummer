import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const id = params.id

    const { data, error } = await supabase.from("products").select("*").eq("id", id).single()

    if (error) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 })
  }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const id = params.id
    const updates = await request.json()

    const { data, error } = await supabase.from("products").update(updates).eq("id", id).select()

    if (error) {
      return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
    }

    if (!data || data.length === 0) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 })
    }

    return NextResponse.json({ success: true, data: data[0] })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const supabase = createServerSupabaseClient()
    const id = params.id

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

