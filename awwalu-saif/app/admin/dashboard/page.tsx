"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Plus, Edit, Trash2, LogOut, Layers, Package } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/components/ui/use-toast"
import { useLanguage } from "@/contexts/language-context"
import AdminProductForm from "@/components/admin-product-form"
import AdminCategoryForm from "@/components/admin-category-form"
import { supabase } from "@/lib/supabase"

export default function AdminDashboardPage() {
  const { t, language } = useLanguage()
  const router = useRouter()
  const { toast } = useToast()
  const [products, setProducts] = useState<any[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [isAddingProduct, setIsAddingProduct] = useState(false)
  const [isAddingCategory, setIsAddingCategory] = useState(false)
  const [editingProduct, setEditingProduct] = useState<any>(null)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("products")

  // Check authentication on component mount
  useEffect(() => {
    const token = localStorage.getItem("adminToken")
    if (!token) {
      router.push("/admin/login")
    } else {
      setIsAuthenticated(true)
      fetchData()
    }
  }, [router])

  const fetchData = async () => {
    setIsLoading(true)
    try {
      // Fetch products
      const { data: productsData, error: productsError } = await supabase().from("products").select("*")

      if (productsError) {
        throw productsError
      }

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase().from("categories").select("*")

      if (categoriesError) {
        throw categoriesError
      }

      setProducts(productsData || [])
      setCategories(categoriesData || [])
    } catch (error) {
      console.error("Error fetching data:", error)
      toast({
        title: "Error",
        description: "Failed to load data. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleLogout = () => {
    localStorage.removeItem("adminToken")
    localStorage.removeItem("adminUsername")
    router.push("/admin/login")
  }

  const handleAddProduct = async (product: any) => {
    try {
      const { data, error } = await supabase()
        .from("products")
        .insert([
          {
            name_ar: product.name_ar,
            name_en: product.name_en,
            category_id: Number.parseInt(product.category_id),
            brand: product.brand,
            size_type: product.size_type,
            description_ar: product.description_ar,
            description_en: product.description_en,
            image_url: product.image_url,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      setProducts([...products, data[0]])
      setIsAddingProduct(false)
      toast({
        title: language === "ar" ? "تمت الإضافة" : "Product added",
        description: language === "ar" ? "تمت إضافة المنتج بنجاح" : "The product has been added successfully",
      })
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل إضافة المنتج" : "Failed to add product",
        variant: "destructive",
      })
    }
  }

  const handleAddCategory = async (category: any) => {
    try {
      const { data, error } = await supabase()
        .from("categories")
        .insert([
          {
            name_ar: category.name_ar,
            name_en: category.name_en,
            slug: category.slug,
            image_url: category.image_url,
          },
        ])
        .select()

      if (error) {
        throw error
      }

      setCategories([...categories, data[0]])
      setIsAddingCategory(false)
      toast({
        title: language === "ar" ? "تمت الإضافة" : "Category added",
        description: language === "ar" ? "تمت إضافة الفئة بنجاح" : "The category has been added successfully",
      })
    } catch (error) {
      console.error("Error adding category:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل إضافة الفئة" : "Failed to add category",
        variant: "destructive",
      })
    }
  }

  const handleEditProduct = async (product: any) => {
    try {
      const { error } = await supabase()
        .from("products")
        .update({
          name_ar: product.name_ar,
          name_en: product.name_en,
          category_id: Number.parseInt(product.category_id),
          brand: product.brand,
          size_type: product.size_type,
          description_ar: product.description_ar,
          description_en: product.description_en,
          image_url: product.image_url,
        })
        .eq("id", product.id)

      if (error) {
        throw error
      }

      setProducts(products.map((p) => (p.id === product.id ? product : p)))
      setEditingProduct(null)
      toast({
        title: language === "ar" ? "تم التحديث" : "Product updated",
        description: language === "ar" ? "تم تحديث المنتج بنجاح" : "The product has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating product:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل تحديث المنتج" : "Failed to update product",
        variant: "destructive",
      })
    }
  }

  const handleEditCategory = async (category: any) => {
    try {
      const { error } = await supabase()
        .from("categories")
        .update({
          name_ar: category.name_ar,
          name_en: category.name_en,
          slug: category.slug,
          image_url: category.image_url,
        })
        .eq("id", category.id)

      if (error) {
        throw error
      }

      setCategories(categories.map((c) => (c.id === category.id ? category : c)))
      setEditingCategory(null)
      toast({
        title: language === "ar" ? "تم التحديث" : "Category updated",
        description: language === "ar" ? "تم تحديث الفئة بنجاح" : "The category has been updated successfully",
      })
    } catch (error) {
      console.error("Error updating category:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل تحديث الفئة" : "Failed to update category",
        variant: "destructive",
      })
    }
  }

  const handleDeleteProduct = async (id: number) => {
    if (
      !confirm(language === "ar" ? "هل أنت متأكد من حذف هذا المنتج؟" : "Are you sure you want to delete this product?")
    ) {
      return
    }

    try {
      const { error } = await supabase().from("products").delete().eq("id", id)

      if (error) {
        throw error
      }

      setProducts(products.filter((p) => p.id !== id))
      toast({
        title: language === "ar" ? "تم الحذف" : "Product deleted",
        description: language === "ar" ? "تم حذف المنتج بنجاح" : "The product has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting product:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل حذف المنتج" : "Failed to delete product",
        variant: "destructive",
      })
    }
  }

  const handleDeleteCategory = async (id: number) => {
    // Check if there are products in this category
    const productsInCategory = products.filter((p) => p.category_id === id)

    if (productsInCategory.length > 0) {
      toast({
        title: language === "ar" ? "لا يمكن الحذف" : "Cannot delete",
        description:
          language === "ar"
            ? "هذه الفئة تحتوي على منتجات. قم بحذف المنتجات أو نقلها إلى فئة أخرى أولاً."
            : "This category contains products. Delete or move the products to another category first.",
        variant: "destructive",
      })
      return
    }

    if (
      !confirm(language === "ar" ? "هل أنت متأكد من حذف هذه الفئة؟" : "Are you sure you want to delete this category?")
    ) {
      return
    }

    try {
      const { error } = await supabase().from("categories").delete().eq("id", id)

      if (error) {
        throw error
      }

      setCategories(categories.filter((c) => c.id !== id))
      toast({
        title: language === "ar" ? "تم الحذف" : "Category deleted",
        description: language === "ar" ? "تم حذف الفئة بنجاح" : "The category has been deleted successfully",
      })
    } catch (error) {
      console.error("Error deleting category:", error)
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" ? "فشل حذف الفئة" : "Failed to delete category",
        variant: "destructive",
      })
    }
  }

  const getCategoryName = (categoryId: number) => {
    const category = categories.find((c) => c.id === categoryId)
    return language === "ar" ? category?.name_ar : category?.name_en
  }

  if (!isAuthenticated || isLoading) {
    return (
      <div className="container py-10 flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    )
  }

  return (
    <div className="container py-10">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-heading font-bold">{t("admin.dashboard")}</h1>
        <Button variant="outline" onClick={handleLogout}>
          <LogOut className="h-4 w-4 mr-2" />
          {language === "ar" ? "تسجيل الخروج" : "Logout"}
        </Button>
      </div>

      <Tabs defaultValue="products" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="products">
            <Package className="h-4 w-4 mr-2" />
            {language === "ar" ? "المنتجات" : "Products"}
          </TabsTrigger>
          <TabsTrigger value="categories">
            <Layers className="h-4 w-4 mr-2" />
            {language === "ar" ? "الفئات" : "Categories"}
          </TabsTrigger>
          <TabsTrigger value="add-product">{t("admin.addProduct")}</TabsTrigger>
          <TabsTrigger value="add-category">{language === "ar" ? "إضافة فئة" : "Add Category"}</TabsTrigger>
        </TabsList>

        <TabsContent value="products">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{language === "ar" ? "قائمة المنتجات" : "Product List"}</h2>
            <Button onClick={() => setActiveTab("add-product")}>
              <Plus className="h-4 w-4 mr-2" />
              {t("admin.addProduct")}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <Card key={product.id}>
                <div className="relative aspect-video">
                  <Image
                    src={product.image_url || "/placeholder.svg"}
                    alt={language === "ar" ? product.name_ar : product.name_en}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {language === "ar" ? product.name_ar : product.name_en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {product.brand} - {getCategoryName(product.category_id)}
                  </p>
                  <p className="text-sm line-clamp-2">
                    {language === "ar" ? product.description_ar : product.description_en}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm" onClick={() => setEditingProduct(product)}>
                    <Edit className="h-4 w-4 mr-1" />
                    {t("admin.editProduct")}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteProduct(product.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    {t("admin.deleteProduct")}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories">
          <div className="mb-4 flex justify-between items-center">
            <h2 className="text-xl font-semibold">{language === "ar" ? "قائمة الفئات" : "Category List"}</h2>
            <Button onClick={() => setActiveTab("add-category")}>
              <Plus className="h-4 w-4 mr-2" />
              {language === "ar" ? "إضافة فئة" : "Add Category"}
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => (
              <Card key={category.id}>
                <div className="relative aspect-video">
                  <Image
                    src={category.image_url || "/placeholder.svg"}
                    alt={language === "ar" ? category.name_ar : category.name_en}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg mb-1">
                    {language === "ar" ? category.name_ar : category.name_en}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {language === "ar" ? "الرابط: " : "Slug: "}
                    {category.slug}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {language === "ar"
                      ? `عدد المنتجات: ${products.filter((p) => p.category_id === category.id).length}`
                      : `Products: ${products.filter((p) => p.category_id === category.id).length}`}
                  </p>
                </CardContent>
                <CardFooter className="flex justify-end gap-2 p-4 pt-0">
                  <Button variant="outline" size="sm" onClick={() => setEditingCategory(category)}>
                    <Edit className="h-4 w-4 mr-1" />
                    {language === "ar" ? "تعديل" : "Edit"}
                  </Button>
                  <Button variant="destructive" size="sm" onClick={() => handleDeleteCategory(category.id)}>
                    <Trash2 className="h-4 w-4 mr-1" />
                    {language === "ar" ? "حذف" : "Delete"}
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="add-product">
          <Card>
            <CardHeader>
              <CardTitle>{t("admin.addProduct")}</CardTitle>
              <CardDescription>
                {language === "ar" ? "أضف منتجًا جديدًا إلى المتجر" : "Add a new product to the store"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminProductForm onSubmit={handleAddProduct} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="add-category">
          <Card>
            <CardHeader>
              <CardTitle>{language === "ar" ? "إضافة فئة" : "Add Category"}</CardTitle>
              <CardDescription>
                {language === "ar" ? "أضف فئة جديدة إلى المتجر" : "Add a new category to the store"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCategoryForm onSubmit={handleAddCategory} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Product Modal */}
      {editingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>{t("admin.editProduct")}</CardTitle>
              <CardDescription>
                {language === "ar" ? "تعديل بيانات المنتج" : "Edit product information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminProductForm
                product={editingProduct}
                onSubmit={handleEditProduct}
                onCancel={() => setEditingProduct(null)}
              />
            </CardContent>
          </Card>
        </div>
      )}

      {/* Edit Category Modal */}
      {editingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-auto">
            <CardHeader>
              <CardTitle>{language === "ar" ? "تعديل الفئة" : "Edit Category"}</CardTitle>
              <CardDescription>
                {language === "ar" ? "تعديل بيانات الفئة" : "Edit category information"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <AdminCategoryForm
                category={editingCategory}
                onSubmit={handleEditCategory}
                onCancel={() => setEditingCategory(null)}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}

