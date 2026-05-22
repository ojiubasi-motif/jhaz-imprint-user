import { Navbar } from "@/components/navbar"
import { ProductCatalog } from "@/components/catalog/product-catalog"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "Shop Our Collection | Jhaz-Imprints",
  description:
    "Browse our collection of premium Nigerian traditional attire. Agbada, Ankara, Kaftan, Aso-Oke and more. Custom-tailored to your measurements.",
}

export default function CatalogPage() {
  return (
    <>
      <Navbar />
      <main className="pt-16 lg:pt-20">
        <ProductCatalog />
      </main>
      <Footer />
    </>
  )
}
