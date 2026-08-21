'use client'

import { usePathname } from 'next/navigation'
import Navbar from './Navbar'

export default function SiteNavbar() {
  const pathname = usePathname()

  // Hide public navbar inside the admin panel
  if (pathname?.startsWith('/admin')) return null

  return <Navbar />
}
