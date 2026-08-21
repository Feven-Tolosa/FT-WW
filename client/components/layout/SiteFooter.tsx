'use client'

import { usePathname } from 'next/navigation'
import Footer from './Footer'

export default function SiteFooter() {
  const pathname = usePathname()

  // Hide footer inside the admin panel
  if (pathname?.startsWith('/admin')) return null

  return <Footer />
}
