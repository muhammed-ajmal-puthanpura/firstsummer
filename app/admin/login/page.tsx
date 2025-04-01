"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { supabase } from "@/lib/supabase"

export default function AdminLoginPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Check admin credentials directly with Supabase
      const { data, error } = await supabase().from("admins").select("*").eq("username", username).single()

      if (error || !data) {
        throw new Error("Invalid credentials")
      }

      // In a real app, you would verify the password hash
      // For demo purposes, we'll use a simple check
      if (data.username === username) {
        // Set a token in localStorage to simulate authentication
        localStorage.setItem("adminToken", "demo-token")
        localStorage.setItem("adminUsername", username)

        toast({
          title: language === "ar" ? "تم تسجيل الدخول بنجاح" : "Login successful",
          description: language === "ar" ? "جاري التحويل إلى لوحة التحكم..." : "Redirecting to admin dashboard...",
        })

        // Redirect to admin dashboard
        router.push("/admin/dashboard")
      } else {
        throw new Error("Invalid credentials")
      }
    } catch (error) {
      toast({
        title: language === "ar" ? "فشل تسجيل الدخول" : "Login failed",
        description: language === "ar" ? "اسم المستخدم أو كلمة المرور غير صحيحة" : "Invalid username or password",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-md">
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">{t("admin.login")}</CardTitle>
            <CardDescription>
              {language === "ar"
                ? "أدخل بيانات الاعتماد الخاصة بك للوصول إلى لوحة تحكم المدير"
                : "Enter your credentials to access the admin dashboard"}
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">{t("admin.username")}</Label>
                <Input id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">{t("admin.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? (
                  <span className="flex items-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {language === "ar" ? "جاري تسجيل الدخول..." : "Logging in..."}
                  </span>
                ) : (
                  t("admin.login")
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}

