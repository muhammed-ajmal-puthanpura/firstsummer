import { type NextRequest, NextResponse } from "next/server"
import clientPromise from "@/lib/db"

export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("awwalu-saif")

    const category = request.nextUrl.searchParams.get("category")

    let query = {}
    if (category) {
      query = { category }
    }

    const products = await db.collection("products").find(query).toArray()

    return NextResponse.json(products)
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("awwalu-saif")

    const product = await request.json()

    // Validate required fields
    if (!product.nameAr || !product.nameEn || !product.category || !product.brand) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const result = await db.collection("products").insertOne({
      ...product,
      createdAt: new Date(),
    })

    return NextResponse.json({
      id: result.insertedId,
      ...product,
    })
  } catch (error) {
    console.error("Database error:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}

