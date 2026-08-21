import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import './globals.css'
import SiteNavbar from '@/components/layout/SiteNavbar'
import SiteFooter from '@/components/layout/SiteFooter'

const geistSans = GeistSans
const geistMono = GeistMono

export const metadata: Metadata = {
  title: 'TF Wood Works',
  description: 'Custom wood creations and furniture for your home.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased `}
      >
        <SiteNavbar />
        {children}
        <SiteFooter />
      </body>
    </html>
  )
}
