"use client"

import Link from "next/link"
import { Facebook, Instagram, Twitter, Phone, Mail, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export default function Footer() {
  const { t, language, dir } = useLanguage()
  const fontClass = language === "ar" ? "font-arabic" : "font-sans"

  return (
    <footer className={`bg-background border-t ${fontClass}`}>
      <div className="container py-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-heading font-bold mb-4">
              {language === "ar" ? "الصيف الأول" : "First Summer"}
            </h3>
            <p className="text-muted-foreground">
              {language === "ar"
                ? "متجرك المفضل للإلكترونيات عالية الجودة."
                : "Your favorite store for high-quality electronics."}
            </p>
            <div className="flex space-x-4 mt-4">
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-primary">
                  {t("nav.home")}
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-muted-foreground hover:text-primary">
                  {t("nav.products")}
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-primary">
                  {t("nav.about")}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-primary">
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">{t("footer.contactUs")}</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-primary mt-0.5 flex-shrink-0 me-2" />
                <span className="text-muted-foreground">
                  {language === "ar"
                    ? "شارع الملك فهد، الرياض، المملكة العربية السعودية"
                    : "King Fahd Road, Riyadh, Saudi Arabia"}
                </span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-primary flex-shrink-0 me-2" />
                <span className="text-muted-foreground">+966 123 456 789</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-primary flex-shrink-0 me-2" />
                <span className="text-muted-foreground">info@firstsummer.com</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-heading font-bold mb-4">{t("footer.followUs")}</h3>
            <div className="h-[200px] rounded-lg overflow-hidden">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3624.6554817260266!2d46.6886873!3d24.6866!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjTCsDQxJzExLjgiTiA0NsKwNDEnMTkuMyJF!5e0!3m2!1sen!2sus!4v1635789575926!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>

        <div className="border-t mt-10 pt-6 text-center text-muted-foreground">
          <p>
            © {new Date().getFullYear()}{" "}
            {language === "ar"
              ? "الصيف الأول للإلكترونيات. جميع الحقوق محفوظة."
              : "First Summer Electronics. All rights reserved."}
          </p>
        </div>
      </div>
    </footer>
  )
}

