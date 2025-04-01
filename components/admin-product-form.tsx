"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { supabase } from "@/lib/supabase"

interface Category {
  id: number
  slug: string
  name_ar: string
  name_en: string
}

interface AdminProductFormProps {
  product?: any
  onSubmit: (product: any) => void
  onCancel?: () => void
}

export default function AdminProductForm({ product, onSubmit, onCancel }: AdminProductFormProps) {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name_ar: product?.name_ar || "",
    name_en: product?.name_en || "",
    category_id: product?.category_id?.toString() || "",
    brand: product?.brand || "",
    size_type: product?.size_type || "",
    description_ar: product?.description_ar || "",
    description_en: product?.description_en || "",
    image_url: product?.image_url || "/placeholder.svg?height=300&width=300",
  })
  const [categories, setCategories] = useState<Category[]>([])
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Fetch categories - memoized to prevent unnecessary re-fetches
  const fetchCategories = useCallback(async () => {
    const { data, error } = await supabase().from("categories").select("*")

    if (error) {
      console.error("Error fetching categories:", error)
      return
    }

    setCategories(data || [])
  }, [])

  useEffect(() => {
    fetchCategories()
  }, [fetchCategories])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      // Use URL.createObjectURL for better performance
      const objectUrl = URL.createObjectURL(file)
      setImagePreview(objectUrl)

      // Clean up the object URL when component unmounts or when preview changes
      return () => URL.revokeObjectURL(objectUrl)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      let finalImageUrl = formData.image_url

      // If there's a new image, use the preview URL
      // In a real app, you would upload to Supabase Storage
      if (imagePreview) {
        finalImageUrl = imagePreview
      }

      const finalProduct = {
        ...formData,
        category_id: Number.parseInt(formData.category_id, 10),
        image_url: finalImageUrl,
        id: product?.id,
      }

      // Show success message
      toast({
        title: product ? "Product Updated" : "Product Added",
        description: product
          ? "The product has been updated successfully."
          : "The product has been added successfully.",
      })

      onSubmit(finalProduct)
    } catch (error) {
      console.error("Error submitting product:", error)
      toast({
        title: "Error",
        description: "There was an error saving the product. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name_ar">{t("admin.productNameAr")}</Label>
          <Input
            id="name_ar"
            name="name_ar"
            value={formData.name_ar}
            onChange={handleChange}
            required
            dir="rtl"
            className="font-arabic"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="name_en">{t("admin.productNameEn")}</Label>
          <Input id="name_en" name="name_en" value={formData.name_en} onChange={handleChange} required dir="ltr" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="category_id">{t("admin.category")}</Label>
          <Select value={formData.category_id} onValueChange={(value) => handleSelectChange("category_id", value)}>
            <SelectTrigger>
              <SelectValue placeholder={language === "ar" ? "اختر الفئة" : "Select category"} />
            </SelectTrigger>
            <SelectContent>
              {categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {language === "ar" ? category.name_ar : category.name_en}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="brand">{t("admin.brand")}</Label>
          <Input id="brand" name="brand" value={formData.brand} onChange={handleChange} required />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="size_type">{language === "ar" ? "الحجم / النوع" : "Size / Type"}</Label>
        <Input id="size_type" name="size_type" value={formData.size_type} onChange={handleChange} required />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="description_ar">{t("admin.descriptionAr")}</Label>
          <Textarea
            id="description_ar"
            name="description_ar"
            value={formData.description_ar}
            onChange={handleChange}
            rows={4}
            dir="rtl"
            className="font-arabic"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="description_en">{t("admin.descriptionEn")}</Label>
          <Textarea
            id="description_en"
            name="description_en"
            value={formData.description_en}
            onChange={handleChange}
            rows={4}
            dir="ltr"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">{t("admin.image")}</Label>
        <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
        <div className="mt-4 relative aspect-video w-full max-w-md mx-auto border rounded-md overflow-hidden">
          <Image src={imagePreview || formData.image_url} alt="Product preview" fill className="object-contain" />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        {onCancel && (
          <Button type="button" variant="outline" onClick={onCancel}>
            {t("admin.cancel")}
          </Button>
        )}
        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <span className="flex items-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {language === "ar" ? "جاري الحفظ..." : "Saving..."}
            </span>
          ) : product ? (
            t("admin.save")
          ) : (
            t("admin.submit")
          )}
        </Button>
      </div>
    </form>
  )
}

