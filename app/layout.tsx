import type { Metadata } from 'next'
import { Plus_Jakarta_Sans, Cormorant_Garamond } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta',
})

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-cormorant',
})

export const metadata: Metadata = {
  title: 'Jhaz Imprints | Elegance Redefined',
  description:
    'Premium Nigerian traditional attire, custom-tailored and delivered to your door. Browse Agbada, Ankara, Aso-Oke, Kaftan, and more. Wear your culture with pride.',
  keywords: [
    'Nigerian fashion',
    'traditional attire',
    'agbada',
    'ankara',
    'aso-oke',
    'kaftan',
    'custom tailoring',
    'African fashion',
    'premium fashion',
    'made to measure',
  ],
}

export const viewport = {
  themeColor: '#B8860B',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="bg-background">
      <body
        className={`${plusJakarta.variable} ${cormorant.variable} font-sans antialiased`}
      >
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
