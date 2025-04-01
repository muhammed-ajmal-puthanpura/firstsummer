"use client"

import type React from "react"
import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface AdminCategoryFormProps {
  category?: any
  onSubmit: (category: any) => void
  onCancel?: () => void
}

export default function AdminCategoryForm({ category, onSubmit, onCancel }: AdminCategoryFormProps) {
  const { t, language } = useLanguage()
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name_ar: category?.name_ar || "",
    name_en: category?.name_en || "",
    slug: category?.slug || "",
    image_url: category?.image_url || "/placeholder.svg?height=300&width=300",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    // Auto-generate slug from English name if slug field is empty
    if (name === "name_en" && !formData.slug) {
      const slug = value
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w-]+/g, "")
      setFormData((prev) => ({ ...prev, [name]: value, slug }))
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }
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

      const finalCategory = {
        ...formData,
        image_url: finalImageUrl,
        id: category?.id,
      }

      // Show success message
      toast({
        title: category ? "Category Updated" : "Category Added",
        description: category
          ? "The category has been updated successfully."
          : "The category has been added successfully.",
      })

      onSubmit(finalCategory)
    } catch (error) {
      console.error("Error submitting category:", error)
      toast({
        title: "Error",
        description: "There was an error saving the category. Please try again.",
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
          <Label htmlFor="name_ar">{language === "ar" ? "اسم الفئة بالعربية" : "Category Name (Arabic)"}</Label>
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
          <Label htmlFor="name_en">{language === "ar" ? "اسم الفئة بالإنجليزية" : "Category Name (English)"}</Label>
          <Input id="name_en" name="name_en" value={formData.name_en} onChange={handleChange} required dir="ltr" />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="slug">{language === "ar" ? "الرابط المختصر" : "Slug"}</Label>
        <Input
          id="slug"
          name="slug"
          value={formData.slug}
          onChange={handleChange}
          required
          dir="ltr"
          placeholder="example-category"
        />
        <p className="text-sm text-muted-foreground">
          {language === "ar"
            ? "سيتم استخدام هذا في عنوان URL للفئة. يجب أن يحتوي على أحرف صغيرة وشرطات فقط."
            : "This will be used in the category URL. Should contain only lowercase letters and hyphens."}
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">{language === "ar" ? "صورة الفئة" : "Category Image"}</Label>
        <Input id="image" name="image" type="file" accept="image/*" onChange={handleImageChange} />
        <div className="mt-4 relative aspect-video w-full max-w-md mx-auto border rounded-md overflow-hidden">
          <Image src={imagePreview || formData.image_url} alt="Category preview" fill className="object-contain" />
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
          ) : category ? (
            language === "ar" ? (
              "تحديث الفئة"
            ) : (
              "Update Category"
            )
          ) : language === "ar" ? (
            "إضافة فئة"
          ) : (
            "Add Category"
          )}
        </Button>
      </div>
    </form>
  )
}

