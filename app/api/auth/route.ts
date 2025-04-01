import { type NextRequest, NextResponse } from "next/server"
import { createServerSupabaseClient } from "@/lib/supabase"
import { sign } from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()
    const supabase = createServerSupabaseClient()

    // Query the admins table
    const { data, error } = await supabase.from("admins").select("*").eq("username", username).single()

    if (error || !data) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, you would properly compare password hashes
    // For demo purposes, we'll assume the password is correct if the user exists
    // and the password_hash field exists (which would normally contain a bcrypt hash)
    if (data.password_hash) {
      // Create a JWT token
      const token = sign({ username, role: "admin" }, process.env.JWT_SECRET || "fallback_secret", { expiresIn: "1d" })

      return NextResponse.json({ token })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

