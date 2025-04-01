"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type Language = "ar" | "en"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
  dir: "rtl" | "ltr"
}

const translations = {
  ar: {
    "nav.home": "الرئيسية",
    "nav.products": "المنتجات",
    "nav.about": "من نحن",
    "nav.contact": "اتصل بنا",
    "categories.ovens": "أفران",
    "categories.washingMachines": "غسالات",
    "categories.tvs": "تلفزيونات",
    "categories.acs": "مكيفات",
    "footer.contactUs": "اتصل بنا",
    "footer.address": "العنوان",
    "footer.phone": "الهاتف",
    "footer.email": "البريد الإلكتروني",
    "footer.quickLinks": "روابط سريعة",
    "footer.followUs": "تابعنا",
    "admin.login": "تسجيل الدخول",
    "admin.dashboard": "لوحة التحكم",
    "admin.addProduct": "إضافة منتج",
    "admin.editProduct": "تعديل منتج",
    "admin.deleteProduct": "حذف منتج",
    "admin.productName": "اسم المنتج",
    "admin.productNameAr": "اسم المنتج بالعربية",
    "admin.productNameEn": "اسم المنتج بالإنجليزية",
    "admin.category": "الفئة",
    "admin.brand": "العلامة التجارية",
    "admin.description": "الوصف",
    "admin.descriptionAr": "الوصف بالعربية",
    "admin.descriptionEn": "الوصف بالإنجليزية",
    "admin.image": "الصورة",
    "admin.submit": "إرسال",
    "admin.cancel": "إلغاء",
    "admin.save": "حفظ",
    "admin.username": "اسم المستخدم",
    "admin.password": "كلمة المرور",
    "hero.title": "الصيف الأول للإلكترونيات",
    "hero.subtitle": "أفضل المنتجات الإلكترونية بأفضل الأسعار",
    "hero.browseProducts": "تصفح المنتجات",
    "products.featured": "منتجات مميزة",
    "products.new": "منتجات جديدة",
    "products.viewAll": "عرض الكل",
    "products.brand": "العلامة التجارية",
    "products.size": "الحجم",
    "products.type": "النوع",
    "products.noProducts": "لا توجد منتجات في هذه الفئة",
    "about.title": "من نحن",
    "contact.title": "اتصل بنا",
    "contact.form.name": "الاسم",
    "contact.form.email": "البريد الإلكتروني",
    "contact.form.message": "الرسالة",
    "contact.form.send": "إرسال",
    "home.categories": "فئات المنتجات",
    "home.categories.description": "استكشف مجموعتنا الواسعة من المنتجات الإلكترونية عالية الجودة عبر مختلف الفئات",
    "home.visitShop": "زيارة متجرنا",
    "home.visitShop.description":
      "استمتع بمجموعتنا الواسعة من المنتجات الإلكترونية شخصيًا في صالة العرض الحديثة لدينا. فريقنا المتخصص جاهز لمساعدتك في أي استفسارات ومساعدتك في العثور على الإلكترونيات المثالية لمنزلك.",
    "home.findLocation": "ابحث عن موقعنا",
    "home.featuredProducts": "منتجات مميزة",
    "home.testimonials": "آراء عملائنا",
    "home.testimonials.description": "لا تأخذ كلمتنا فقط. إليك ما يقوله عملاؤنا الراضون عن منتجاتنا وخدماتنا.",
    "home.customerName": "اسم العميل",
    "home.loyalCustomer": "عميل دائم",
    "home.testimonial":
      "لقد كنت أتسوق في أول السيف للإلكترونيات لسنوات. اختيار المنتجات وخدمة العملاء لديهم لا مثيل لها. أوصي بشدة!",
    "products.title": "منتجاتنا",
    "products.description": "تصفح مجموعتنا الواسعة من المنتجات الإلكترونية عالية الجودة عبر مختلف الفئات.",
    "products.browse": "تصفح",
    "about.description": "تعرف أكثر على أول السيف للإلكترونيات",
    "about.welcome":
      "مرحبًا بكم في أول السيف للإلكترونيات، وجهتكم المفضلة للمنتجات الإلكترونية عالية الجودة في المملكة العربية السعودية. تأسسنا برؤية لتزويد العملاء بأفضل الأجهزة الإلكترونية، ونمونا لنصبح اسمًا موثوقًا به في الصناعة.",
    "about.pride":
      "في أول السيف للإلكترونيات، نفخر بتقديم مجموعة واسعة من المنتجات من العلامات التجارية المشهورة عالميًا. تشمل مجموعتنا الأفران والغسالات والتلفزيونات ومكيفات الهواء والمزيد. نختار بعناية كل منتج لضمان تلبيته لمعاييرنا العالية من الجودة والأداء.",
    "about.mission": "مهمتنا",
    "about.missionText":
      "مهمتنا هي تزويد عملائنا بأفضل المنتجات الإلكترونية التي تعزز نمط حياتهم وتلبي احتياجاتهم الخاصة. نسعى جاهدين لتقديم خدمة عملاء ممتازة ونصائح خبيرة وتجربة تسوق ممتعة.",
    "about.vision": "رؤيتنا",
    "about.visionText":
      "نهدف إلى أن نكون بائع التجزئة الرائد للإلكترونيات في المملكة العربية السعودية، المعروف بجودة المنتج الاستثنائية وخدمة العملاء والحلول المبتكرة. نعمل باستمرار على توسيع مجموعة منتجاتنا وتحسين خدماتنا لخدمة عملائنا بشكل أفضل.",
    "about.whyChooseUs": "لماذا تختارنا؟",
    "about.highQuality": "منتجات عالية الجودة من علامات تجارية موثوقة",
    "about.expertAdvice": "نصائح خبيرة ودعم العملاء",
    "about.competitivePrices": "أسعار تنافسية",
    "about.wideRange": "مجموعة واسعة من الأجهزة الإلكترونية",
    "about.afterSales": "خدمة ما بعد البيع والدعم",
    "about.visitStore":
      "قم بزيارة متجرنا اليوم لاستكشاف مجموعتنا الواسعة من المنتجات الإلكترونية. سيكون فريقنا المتخصص سعيدًا بمساعدتك في العثور على الجهاز المثالي لمنزلك أو مكتبك.",
    "contact.sendMessage": "أرسل لنا رسالة",
    "contact.messageSent": "تم إرسال الرسالة",
    "contact.weWillGetBack": "سنتواصل معك قريبًا",
    "contact.sending": "جاري الإرسال...",
    "notFound.title": "404",
    "notFound.subtitle": "الصفحة غير موجودة",
    "notFound.description": "عذرًا، الصفحة التي تبحث عنها غير موجودة أو تم نقلها.",
    "notFound.returnHome": "العودة إلى الصفحة الرئيسية",
  },
  en: {
    "nav.home": "Home",
    "nav.products": "Products",
    "nav.about": "About",
    "nav.contact": "Contact",
    "categories.ovens": "Ovens",
    "categories.washingMachines": "Washing Machines",
    "categories.tvs": "TVs",
    "categories.acs": "ACs",
    "footer.contactUs": "Contact Us",
    "footer.address": "Address",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.quickLinks": "Quick Links",
    "footer.followUs": "Follow Us",
    "admin.login": "Login",
    "admin.dashboard": "Dashboard",
    "admin.addProduct": "Add Product",
    "admin.editProduct": "Edit Product",
    "admin.deleteProduct": "Delete Product",
    "admin.productName": "Product Name",
    "admin.productNameAr": "Product Name (Arabic)",
    "admin.productNameEn": "Product Name (English)",
    "admin.category": "Category",
    "admin.brand": "Brand",
    "admin.description": "Description",
    "admin.descriptionAr": "Description (Arabic)",
    "admin.descriptionEn": "Description (English)",
    "admin.image": "Image",
    "admin.submit": "Submit",
    "admin.cancel": "Cancel",
    "admin.save": "Save",
    "admin.username": "Username",
    "admin.password": "Password",
    "hero.title": "First Summer Electronics",
    "hero.subtitle": "Best electronic products at the best prices",
    "hero.browseProducts": "Browse Products",
    "products.featured": "Featured Products",
    "products.new": "New Arrivals",
    "products.viewAll": "View All",
    "products.brand": "Brand",
    "products.size": "Size",
    "products.type": "Type",
    "products.noProducts": "No products in this category",
    "about.title": "About Us",
    "contact.title": "Contact Us",
    "contact.form.name": "Name",
    "contact.form.email": "Email",
    "contact.form.message": "Message",
    "contact.form.send": "Send",
    "home.categories": "Our Categories",
    "home.categories.description":
      "Explore our wide range of high-quality electronic products across various categories.",
    "home.visitShop": "Visit Our Shop",
    "home.visitShop.description":
      "Experience our wide range of electronic products in person at our modern showroom. Our knowledgeable staff is ready to assist you with any questions and help you find the perfect electronics for your home.",
    "home.findLocation": "Find Our Location",
    "home.featuredProducts": "Featured Products",
    "home.testimonials": "What Our Customers Say",
    "home.testimonials.description":
      "Don't just take our word for it. Here's what our satisfied customers have to say about our products and service.",
    "home.customerName": "Customer Name",
    "home.loyalCustomer": "Loyal Customer",
    "home.testimonial":
      "I've been shopping at Awwalu Saif Electronics for years. Their product selection and customer service are unmatched. Highly recommended!",
    "products.title": "Our Products",
    "products.description": "Browse our wide range of high-quality electronic products across various categories.",
    "products.browse": "Browse",
    "about.description": "Learn more about Awwalu Saif Electronics",
    "about.welcome":
      "Welcome to Awwalu Saif Electronics, your premier destination for high-quality electronic products in Saudi Arabia. Established with a vision to provide customers with the best electronic appliances, we have grown to become a trusted name in the industry.",
    "about.pride":
      "At Awwalu Saif Electronics, we take pride in offering a wide range of products from renowned brands worldwide. Our collection includes ovens, washing machines, televisions, air conditioners, and much more. We carefully select each product to ensure it meets our high standards of quality and performance.",
    "about.mission": "Our Mission",
    "about.missionText":
      "Our mission is to provide our customers with the best electronic products that enhance their lifestyle and meet their specific needs. We strive to offer excellent customer service, expert advice, and a pleasant shopping experience.",
    "about.vision": "Our Vision",
    "about.visionText":
      "We aim to be the leading electronics retailer in Saudi Arabia, known for our exceptional product quality, customer service, and innovative solutions. We continuously work towards expanding our product range and improving our services to better serve our customers.",
    "about.whyChooseUs": "Why Choose Us?",
    "about.highQuality": "High-quality products from trusted brands",
    "about.expertAdvice": "Expert advice and customer support",
    "about.competitivePrices": "Competitive prices",
    "about.wideRange": "Wide range of electronic appliances",
    "about.afterSales": "After-sales service and support",
    "about.visitStore":
      "Visit our store today to explore our extensive collection of electronic products. Our knowledgeable staff will be happy to assist you in finding the perfect appliance for your home or office.",
    "contact.sendMessage": "Send Us a Message",
    "contact.messageSent": "Message Sent",
    "contact.weWillGetBack": "We'll get back to you soon",
    "contact.sending": "Sending...",
    "notFound.title": "404",
    "notFound.subtitle": "Page Not Found",
    "notFound.description": "Sorry, the page you are looking for doesn't exist or has been moved.",
    "notFound.returnHome": "Return to Home",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("ar")
  const [dir, setDir] = useState<"rtl" | "ltr">("rtl")

  useEffect(() => {
    // Check if there's a saved language preference
    const savedLanguage = localStorage.getItem("language") as Language
    if (savedLanguage) {
      setLanguage(savedLanguage)
    }
  }, [])

  useEffect(() => {
    // Update direction based on language
    setDir(language === "ar" ? "rtl" : "ltr")

    // Update HTML attributes
    document.documentElement.lang = language
    document.documentElement.dir = dir

    // Save language preference
    localStorage.setItem("language", language)
  }, [language, dir])

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t, dir }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

