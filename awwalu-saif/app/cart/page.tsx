import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Minus, Plus, ShoppingCart, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"

export const metadata: Metadata = {
  title: "سلة التسوق | أول السيف للإلكترونيات",
  description: "سلة التسوق الخاصة بك",
}

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "آيفون 15 برو ماكس",
    price: 5999,
    quantity: 1,
    image: "/placeholder.svg?height=100&width=100",
    color: "أسود",
    storage: "256GB",
  },
  {
    id: 2,
    name: "سماعات آبل إيربودز برو",
    price: 899,
    quantity: 2,
    image: "/placeholder.svg?height=100&width=100",
    color: "أبيض",
    storage: null,
  },
]

export default function CartPage() {
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-bold mb-6">سلة التسوق</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-4">
                    <div className="flex gap-4">
                      <div className="relative h-24 w-24 rounded-md overflow-hidden">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="text-sm text-muted-foreground mt-1">
                              {item.color}
                              {item.storage && ` / ${item.storage}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-medium">{item.price} ر.س</div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {item.quantity > 1 && `${item.price} ر.س × ${item.quantity}`}
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-between items-center mt-4">
                          <div className="flex items-center">
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-r-none">
                              <Minus className="h-3 w-3" />
                            </Button>
                            <div className="h-8 w-10 flex items-center justify-center border-y text-sm">
                              {item.quantity}
                            </div>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-l-none">
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          <Button variant="ghost" size="sm" className="text-destructive">
                            <Trash className="h-4 w-4 mr-1" />
                            إزالة
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="mt-6 flex justify-between">
              <Button variant="outline" asChild>
                <Link href="/products">
                  <ArrowLeft className="mr-2 h-4 w-4 rtl-flip" />
                  متابعة التسوق
                </Link>
              </Button>
              <Button variant="outline">تحديث السلة</Button>
            </div>
          </div>

          <div>
            <Card>
              <CardHeader>
                <CardTitle>ملخص الطلب</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span>المجموع الفرعي</span>
                  <span>{subtotal} ر.س</span>
                </div>
                <div className="flex justify-between">
                  <span>الشحن</span>
                  <span>{shipping === 0 ? "مجاني" : `${shipping} ر.س`}</span>
                </div>
                <Separator />
                <div className="flex justify-between font-bold">
                  <span>الإجمالي</span>
                  <span>{total} ر.س</span>
                </div>

                <div className="pt-4">
                  <div className="mb-4">
                    <label htmlFor="coupon" className="block text-sm font-medium mb-1">
                      كود الخصم
                    </label>
                    <div className="flex gap-2">
                      <Input id="coupon" placeholder="أدخل كود الخصم" />
                      <Button variant="outline">تطبيق</Button>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full" size="lg" asChild>
                  <Link href="/checkout">إتمام الطلب</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-xl font-semibold mb-2">سلة التسوق فارغة</h2>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي منتجات إلى سلة التسوق بعد.</p>
          <Button asChild>
            <Link href="/products">تصفح المنتجات</Link>
          </Button>
        </div>
      )}
    </div>
  )
}

