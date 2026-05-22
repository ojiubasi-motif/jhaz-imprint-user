"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react"

const footerLinks = {
  shop: [
    { label: "All Styles", href: "/catalog" },
    { label: "Agbada", href: "/catalog" },
    { label: "Ankara", href: "/catalog" },
    { label: "Aso-Oke", href: "/catalog" },
    { label: "Kaftan", href: "/catalog" },
    { label: "Iro & Buba", href: "/catalog" },
  ],
  company: [
    { label: "About Us", href: "#" },
    { label: "How It Works", href: "#how-it-works" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "FAQs", href: "#" },
    { label: "Size Guide", href: "#" },
  ],
  support: [
    { label: "Contact Us", href: "#" },
    { label: "Shipping Policy", href: "#" },
    { label: "Return Policy", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setSubscribed(true)
      setEmail("")
    }
  }

  return (
    <footer className="bg-sidebar text-sidebar-foreground">
      {/* Newsletter CTA */}
      <div className="border-b border-sidebar-border">
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-bold font-serif sm:text-3xl">
                Stay in Style
              </h3>
              <p className="mt-2 text-sidebar-foreground/70">
                Get exclusive offers, new arrivals, and styling tips delivered
                to your inbox.
              </p>
            </div>

            <form
              onSubmit={handleSubmit}
              className="flex w-full max-w-md gap-3"
            >
              {subscribed ? (
                <p className="flex items-center gap-2 text-sidebar-primary font-medium">
                  <Mail className="h-5 w-5" />
                  Thank you for subscribing!
                </p>
              ) : (
                <>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="flex-1 rounded-lg bg-sidebar-foreground/10 px-5 py-3 text-sm text-sidebar-foreground placeholder:text-sidebar-foreground/40 border border-sidebar-border focus:outline-none focus:border-sidebar-primary/50 transition-colors"
                    required
                  />
                  <button
                    type="submit"
                    className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-sidebar-primary px-6 py-3 text-sm font-semibold text-sidebar-primary-foreground transition-all hover:bg-gold-bright hover:shadow-lg"
                  >
                    Subscribe
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Footer links */}
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-sidebar-primary">
                <span className="text-sm font-bold text-sidebar-primary-foreground tracking-tight">JI</span>
              </div>
              <span className="text-xl font-bold tracking-tight font-serif">
                Jhaz Imprints
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sidebar-foreground/60">
              Premium custom-tailored Nigerian traditional attire, crafted with
              love and delivered to your doorstep.
            </p>

            <div className="mt-6 space-y-3">
              <a
                href="mailto:hello@jhaz-imprints.com"
                className="flex items-center gap-3 text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Mail className="h-4 w-4" />
                hello@jhaz-imprints.com
              </a>
              <a
                href="tel:+2348012345678"
                className="flex items-center gap-3 text-sm text-sidebar-foreground/60 hover:text-sidebar-primary transition-colors"
              >
                <Phone className="h-4 w-4" />
                +234 801 234 5678
              </a>
              <div className="flex items-center gap-3 text-sm text-sidebar-foreground/60">
                <MapPin className="h-4 w-4 shrink-0" />
                Lagos, Nigeria
              </div>
            </div>

            {/* Social Links */}
            <div className="mt-6 flex gap-3">
              {["Instagram", "Twitter", "Facebook", "WhatsApp"].map((social) => (
                <a
                  key={social}
                  href="#"
                  aria-label={`Follow us on ${social}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-sidebar-border text-sm font-bold text-sidebar-foreground/60 transition-all hover:bg-sidebar-primary/20 hover:text-sidebar-primary hover:border-sidebar-primary/30"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>

          {/* Shop links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sidebar-primary">
              Shop
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sidebar-primary">
              Company
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support links */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-sidebar-primary">
              Support
            </h4>
            <ul className="mt-4 space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-sm text-sidebar-foreground/60 transition-colors hover:text-sidebar-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center gap-4 border-t border-sidebar-border pt-8 sm:flex-row sm:justify-between">
          <p className="text-xs text-sidebar-foreground/40">
            &copy; {new Date().getFullYear()} Jhaz Imprints. All rights reserved.
          </p>
          <p className="text-xs text-sidebar-foreground/40">
            Proudly Nigerian. Globally Inspired.
          </p>
        </div>
      </div>
    </footer>
  )
}
