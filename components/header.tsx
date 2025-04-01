"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { Menu, Search, User, Globe } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ModeToggle } from "@/components/mode-toggle"
import { useLanguage } from "@/contexts/language-context"
import { SearchDialog } from "@/components/search-dialog"

export default function Header() {
  const pathname = usePathname()
  const router = useRouter()
  const { language, setLanguage, t, dir } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [searchDialogOpen, setSearchDialogOpen] = useState(false)
  const [sheetOpen, setSheetOpen] = useState(false)

  // Navigation items
  const mainNav = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.products"), href: "/products" },
    { name: t("nav.about"), href: "/about" },
    { name: t("nav.contact"), href: "/contact" },
  ]

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Handle navigation and close sheet
  const handleNavigation = (href: string) => {
    router.push(href)
    setSheetOpen(false)
  }

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full transition-all duration-300",
          isScrolled
            ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
            : "bg-transparent",
        )}
      >
        <div className="container flex h-16 items-center justify-between">
          {/* Left side: Hamburger menu (mobile) and logo */}
          <div className="flex items-center">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden mr-2">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side={dir === "rtl" ? "right" : "left"} className={dir === "rtl" ? "pr-0" : "pl-0"}>
                <div className={dir === "rtl" ? "px-7" : "px-7"}>
                  <div className="flex items-center mb-6">
                    <div className="relative h-10 w-10 overflow-hidden rounded-full mr-3">
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt="First Summer Logo"
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                    <span className="text-xl font-heading font-bold">
                      {language === "ar" ? "الصيف الأول" : "First Summer"}
                    </span>
                  </div>
                  <nav className="flex flex-col gap-4">
                    {mainNav.map((item) => (
                      <button
                        key={item.href}
                        onClick={() => handleNavigation(item.href)}
                        className={cn(
                          "text-lg font-medium transition-colors hover:text-primary text-left py-2",
                          pathname === item.href ? "text-primary" : "text-muted-foreground",
                        )}
                      >
                        {item.name}
                      </button>
                    ))}
                  </nav>
                </div>
              </SheetContent>
            </Sheet>

            {/* Logo and brand name */}
            <Link href="/" className="flex items-center">
              <div className="relative h-10 w-10 overflow-hidden rounded-full">
                <Image
                  src="/placeholder.svg?height=40&width=40"
                  alt="First Summer Logo"
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <span className={`text-xl font-heading font-bold whitespace-nowrap ${dir === "rtl" ? "mr-3" : "ml-3"}`}>
                {language === "ar" ? "الصيف الأول" : "First Summer"}
              </span>
            </Link>
          </div>

          {/* Center: Navigation links (desktop) */}
          <nav className="hidden md:flex items-center gap-6 text-sm absolute left-1/2 transform -translate-x-1/2">
            {mainNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "transition-colors hover:text-primary",
                  pathname === item.href ? "text-primary font-medium" : "text-muted-foreground",
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side: Action buttons */}
          <div className="flex items-center space-x-2 rtl:space-x-reverse">
            <Button variant="ghost" size="icon" onClick={() => setSearchDialogOpen(true)}>
              <Search className="h-5 w-5" />
              <span className="sr-only">Search</span>
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">User menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align={dir === "rtl" ? "end" : "start"}>
                <DropdownMenuItem asChild>
                  <Link href="/admin/login">{t("admin.login")}</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <ModeToggle />

            {/* Hide language toggle on mobile */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
              className="relative hidden md:flex"
            >
              <Globe className="h-5 w-5" />
              <span className="absolute -bottom-1 -right-1 text-[10px] font-bold">
                {language === "ar" ? "EN" : "عر"}
              </span>
              <span className="sr-only">Toggle language</span>
            </Button>
          </div>
        </div>
        <SearchDialog open={searchDialogOpen} onOpenChange={setSearchDialogOpen} />
      </header>

      {/* Mobile language toggle - fixed at bottom right */}
      <div className="md:hidden fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setLanguage(language === "ar" ? "en" : "ar")}
          className="rounded-full shadow-lg bg-background/80 backdrop-blur-sm"
        >
          <Globe className="h-4 w-4 mr-1" />
          <span className="text-xs font-bold">{language === "ar" ? "English" : "العربية"}</span>
        </Button>
      </div>
    </>
  )
}

