"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useLanguage } from "@/contexts/language-context"
import { supabase } from "@/lib/supabase"

interface SearchResult {
  id: number
  name_ar: string
  name_en: string
  image_url: string
  category_id: number
  slug?: string
  type?: "product" | "category"
}

export function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const { language } = useLanguage()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [results, setResults] = useState<SearchResult[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Search function
  const performSearch = async (query: string) => {
    if (!query.trim()) {
      setResults([])
      return
    }

    setIsLoading(true)
    try {
      // Search products
      const { data: products } = await supabase()
        .from("products")
        .select("*")
        .or(`name_ar.ilike.%${query}%,name_en.ilike.%${query}%,brand.ilike.%${query}%`)
        .limit(5)

      // Search categories
      const { data: categories } = await supabase()
        .from("categories")
        .select("*")
        .or(`name_ar.ilike.%${query}%,name_en.ilike.%${query}%`)
        .limit(3)

      // Combine results
      const combinedResults: SearchResult[] = [
        ...(products || []).map((product) => ({ ...product, type: "product" as const })),
        ...(categories || []).map((category) => ({ ...category, type: "category" as const })),
      ]

      setResults(combinedResults)
    } catch (error) {
      console.error("Search error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      performSearch(searchQuery)
    }, 300)

    return () => clearTimeout(timer)
  }, [searchQuery])

  // Handle result click
  const handleResultClick = (result: SearchResult) => {
    if (result.type === "category") {
      router.push(`/products/${result.slug}`)
    } else {
      // Navigate to product detail page
      router.push(`/products/product/${result.id}`)
    }
    onOpenChange(false)
    setSearchQuery("")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>{language === "ar" ? "البحث" : "Search"}</DialogTitle>
        </DialogHeader>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder={language === "ar" ? "ابحث عن منتجات أو فئات..." : "Search for products or categories..."}
            className="pl-10 pr-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
              onClick={() => setSearchQuery("")}
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>

        {isLoading && (
          <div className="flex justify-center py-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
          </div>
        )}

        {!isLoading && results.length > 0 && (
          <div className="mt-4 space-y-2">
            {results.map((result) => (
              <div
                key={`${result.type}-${result.id}`}
                className="flex items-center gap-3 p-2 rounded-md hover:bg-muted cursor-pointer"
                onClick={() => handleResultClick(result)}
              >
                <div className="relative h-12 w-12 overflow-hidden rounded-md flex-shrink-0">
                  <Image
                    src={result.image_url || "/placeholder.svg"}
                    alt={language === "ar" ? result.name_ar : result.name_en}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="font-medium">{language === "ar" ? result.name_ar : result.name_en}</h4>
                  <p className="text-sm text-muted-foreground">
                    {result.type === "category" ? (language === "ar" ? "فئة" : "Category") : result.brand}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!isLoading && searchQuery && results.length === 0 && (
          <div className="text-center py-4 text-muted-foreground">
            {language === "ar" ? "لا توجد نتائج" : "No results found"}
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

