"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/language-context"

export default function HeroSection() {
  const { language, t, dir } = useLanguage()
  const [currentSlide, setCurrentSlide] = useState(0)

  // Sample hero slides
  const slides = [
    {
      id: 1,
      titleAr: "أول السيف للإلكترونيات",
      titleEn: "Awwalu Saif Electronics",
      descriptionAr: "أفضل المنتجات الإلكترونية بأفضل الأسعار",
      descriptionEn: "Best electronic products at the best prices",
      image: "/placeholder.svg?height=600&width=1200",
      buttonTextAr: "تصفح المنتجات",
      buttonTextEn: "Browse Products",
      buttonLink: "/products",
    },
    {
      id: 2,
      titleAr: "أحدث الأجهزة المنزلية",
      titleEn: "Latest Home Appliances",
      descriptionAr: "اكتشف مجموعتنا الواسعة من الأجهزة المنزلية الحديثة",
      descriptionEn: "Discover our wide range of modern home appliances",
      image: "/placeholder.svg?height=600&width=1200",
      buttonTextAr: "اكتشف المزيد",
      buttonTextEn: "Discover More",
      buttonLink: "/products",
    },
  ]

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
  }

  return (
    <div className="relative overflow-hidden">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(${currentSlide * (dir === "rtl" ? 100 : -100)}%)` }}
      >
        {slides.map((slide) => (
          <div key={slide.id} className="min-w-full relative">
            <div className="relative h-[500px] md:h-[600px] lg:h-[700px] w-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={language === "ar" ? slide.titleAr : slide.titleEn}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-black/40" />
              <div className="absolute inset-0 flex items-center">
                <div className="container">
                  <div className="max-w-lg text-white">
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                      {language === "ar" ? slide.titleAr : slide.titleEn}
                    </h1>
                    <p className="text-lg md:text-xl mb-6">
                      {language === "ar" ? slide.descriptionAr : slide.descriptionEn}
                    </p>
                    <Button asChild size="lg" className="font-medium">
                      <Link href={slide.buttonLink}>{language === "ar" ? slide.buttonTextAr : slide.buttonTextEn}</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button
        variant="ghost"
        size="icon"
        className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
        onClick={prevSlide}
      >
        <ChevronLeft className={cn("h-6 w-6", dir === "rtl" && "rtl-flip")} />
        <span className="sr-only">Previous</span>
      </Button>

      <Button
        variant="ghost"
        size="icon"
        className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 text-white rounded-full"
        onClick={nextSlide}
      >
        <ChevronRight className={cn("h-6 w-6", dir === "rtl" && "rtl-flip")} />
        <span className="sr-only">Next</span>
      </Button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => setCurrentSlide(index)}
          >
            <span className="sr-only">Slide {index + 1}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

