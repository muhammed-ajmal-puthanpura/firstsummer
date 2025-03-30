"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"

export default function ProductFilters() {
  const [priceRange, setPriceRange] = useState([0, 10000])

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium mb-4">الفئات</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="category-smartphones" />
            <label
              htmlFor="category-smartphones"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              الهواتف الذكية
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-laptops" />
            <label
              htmlFor="category-laptops"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              أجهزة الكمبيوتر المحمولة
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-tablets" />
            <label
              htmlFor="category-tablets"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              الأجهزة اللوحية
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-accessories" />
            <label
              htmlFor="category-accessories"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              الإكسسوارات
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="category-headphones" />
            <label
              htmlFor="category-headphones"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              سماعات الرأس
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">السعر</h3>
        <Slider
          defaultValue={[0, 10000]}
          max={10000}
          step={100}
          value={priceRange}
          onValueChange={setPriceRange}
          className="mb-6"
        />
        <div className="flex items-center justify-between">
          <span>{priceRange[0]} ر.س</span>
          <span>{priceRange[1]} ر.س</span>
        </div>
      </div>

      <div className="border-t pt-6">
        <h3 className="font-medium mb-4">الماركات</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-apple" />
            <label
              htmlFor="brand-apple"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              آبل
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-samsung" />
            <label
              htmlFor="brand-samsung"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              سامسونج
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-sony" />
            <label
              htmlFor="brand-sony"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              سوني
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-xiaomi" />
            <label
              htmlFor="brand-xiaomi"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              شاومي
            </label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox id="brand-microsoft" />
            <label
              htmlFor="brand-microsoft"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2"
            >
              مايكروسوفت
            </label>
          </div>
        </div>
      </div>

      <div className="border-t pt-6">
        <Accordion type="multiple" defaultValue={["ratings"]}>
          <AccordionItem value="ratings">
            <AccordionTrigger>التقييمات</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-3 pt-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-5" />
                  <label
                    htmlFor="rating-5"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2 flex items-center"
                  >
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-4" />
                  <label
                    htmlFor="rating-4"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2 flex items-center"
                  >
                    <div className="flex items-center">
                      {[...Array(4)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      <svg
                        className="h-4 w-4 text-gray-300"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                      >
                        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                      </svg>
                    </div>
                    <span className="mr-1">وأعلى</span>
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="rating-3" />
                  <label
                    htmlFor="rating-3"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mr-2 flex items-center"
                  >
                    <div className="flex items-center">
                      {[...Array(3)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 fill-yellow-400 text-yellow-400"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                      {[...Array(2)].map((_, i) => (
                        <svg
                          key={i}
                          className="h-4 w-4 text-gray-300"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                        >
                          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                        </svg>
                      ))}
                    </div>
                    <span className="mr-1">وأعلى</span>
                  </label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      <div className="border-t pt-6 flex gap-2">
        <Button className="flex-1">تطبيق الفلتر</Button>
        <Button variant="outline">إعادة ضبط</Button>
      </div>
    </div>
  )
}

