import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"

export const metadata: Metadata = {
  title: "إتمام الطلب | أول السيف للإلكترونيات",
  description: "إتمام عملية الشراء",
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

export default function CheckoutPage() {
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 500 ? 0 : 50
  const total = subtotal + shipping

  return (
    <div className="container py-8">
      <div className="mb-6">
        <Link href="/cart" className="text-primary flex items-center hover:underline">
          <ArrowLeft className="mr-1 h-4 w-4 rtl-flip" />
          العودة إلى سلة التسوق
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">إتمام الطلب</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Shipping Information */}
          <Card>
            <CardHeader>
              <CardTitle>معلومات الشحن</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">الاسم الأول</Label>
                  <Input id="firstName" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="lastName">الاسم الأخير</Label>
                  <Input id="lastName" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="email">البريد الإلكتروني</Label>
                <Input id="email" type="email" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="phone">رقم الهاتف</Label>
                <Input id="phone" type="tel" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="address">العنوان</Label>
                <Input id="address" className="mt-1" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="city">المدينة</Label>
                  <Input id="city" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="region">المنطقة</Label>
                  <Input id="region" className="mt-1" />
                </div>
                <div>
                  <Label htmlFor="postalCode">الرمز البريدي</Label>
                  <Input id="postalCode" className="mt-1" />
                </div>
              </div>
              <div>
                <Label htmlFor="notes">ملاحظات الطلب (اختياري)</Label>
                <Textarea id="notes" className="mt-1" />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle>طريقة الدفع</CardTitle>
            </CardHeader>
            <CardContent>
              <RadioGroup defaultValue="card">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2">
                    <CreditCard className="h-4 w-4" />
                    بطاقة ائتمان / بطاقة مدى
                  </Label>
                </div>
                <div className="mt-4 mr-6 space-y-4">
                  <div>
                    <Label htmlFor="cardNumber">رقم البطاقة</Label>
                    <Input id="cardNumber" className="mt-1" placeholder="0000 0000 0000 0000" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiryDate">تاريخ الانتهاء</Label>
                      <Input id="expiryDate" className="mt-1" placeholder="MM/YY" />
                    </div>
                    <div>
                      <Label htmlFor="cvv">رمز الأمان (CVV)</Label>
                      <Input id="cvv" className="mt-1" placeholder="123" />
                    </div>
                  </div>
                </div>
                <Separator className="my-4" />
                <div className="flex items-center space-x-2 space-x-reverse">
                  <RadioGroupItem value="cod" id="cod" />
                  <Label htmlFor="cod">الدفع عند الاستلام</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </div>

        <div>
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>ملخص الطلب</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3">
                  <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                    <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <div className="text-xs text-muted-foreground">
                      {item.color}
                      {item.storage && ` / ${item.storage}`}
                    </div>
                    <div className="flex justify-between mt-1">
                      <span className="text-sm">
                        {item.quantity} × {item.price} ر.س
                      </span>
                      <span className="font-medium">{item.price * item.quantity} ر.س</span>
                    </div>
                  </div>
                </div>
              ))}

              <Separator />

              <div className="space-y-2">
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
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" size="lg">
                تأكيد الطلب
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}

