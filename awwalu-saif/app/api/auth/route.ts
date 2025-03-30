import { type NextRequest, NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json()

    // In a real app, you would fetch the user from the database
    // and compare the password hash

    // For demo purposes, we'll use a hardcoded admin user
    if (username === "admin" && password === "admin123") {
      // Create a JWT token
      const token = sign({ username, role: "admin" }, process.env.JWT_SECRET || "secret", { expiresIn: "1d" })

      return NextResponse.json({ token })
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (error) {
    console.error("Authentication error:", error)
    return NextResponse.json({ error: "Authentication failed" }, { status: 500 })
  }
}

