import type { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "About Us | Awwalu Saif Electronics",
  description: "Learn more about Awwalu Saif Electronics",
}

export default function AboutPage() {
  return (
    <div className="container py-12">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">About Us</h1>

        <div className="relative h-[300px] w-full mb-8 rounded-lg overflow-hidden">
          <Image
            src="/placeholder.svg?height=600&width=1200"
            alt="Awwalu Saif Electronics"
            fill
            className="object-cover"
          />
        </div>

        <div className="prose max-w-none">
          <p className="text-lg leading-relaxed mb-6">
            Welcome to Awwalu Saif Electronics, your premier destination for high-quality electronic products in Saudi
            Arabia. Established with a vision to provide customers with the best electronic appliances, we have grown to
            become a trusted name in the industry.
          </p>

          <p className="text-lg leading-relaxed mb-6">
            At Awwalu Saif Electronics, we take pride in offering a wide range of products from renowned brands
            worldwide. Our collection includes ovens, washing machines, televisions, air conditioners, and much more. We
            carefully select each product to ensure it meets our high standards of quality and performance.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg leading-relaxed mb-6">
            Our mission is to provide our customers with the best electronic products that enhance their lifestyle and
            meet their specific needs. We strive to offer excellent customer service, expert advice, and a pleasant
            shopping experience.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Our Vision</h2>
          <p className="text-lg leading-relaxed mb-6">
            We aim to be the leading electronics retailer in Saudi Arabia, known for our exceptional product quality,
            customer service, and innovative solutions. We continuously work towards expanding our product range and
            improving our services to better serve our customers.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="list-disc pl-6 mb-6 space-y-2">
            <li className="text-lg">High-quality products from trusted brands</li>
            <li className="text-lg">Expert advice and customer support</li>
            <li className="text-lg">Competitive prices</li>
            <li className="text-lg">Wide range of electronic appliances</li>
            <li className="text-lg">After-sales service and support</li>
          </ul>

          <p className="text-lg leading-relaxed">
            Visit our store today to explore our extensive collection of electronic products. Our knowledgeable staff
            will be happy to assist you in finding the perfect appliance for your home or office.
          </p>
        </div>
      </div>
    </div>
  )
}

