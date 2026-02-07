import Container from './Container'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className='bg-black text-gray-400 pt-20'>
      <Container>
        {/* Top Grid */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-white/10'>
          {/* Brand */}
          <div>
            <h2 className='text-white text-xl font-light tracking-wide mb-4'>
              TF<span className='text-gray-400'>Woods</span>
            </h2>
            <p className='text-sm leading-relaxed'>
              Thoughtfully crafted furniture for modern living. Designed to
              bring warmth, comfort, and timeless style into your space.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h3 className='text-white mb-4 font-light'>Shop</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>Chairs</Link>
              </li>
              <li>
                <Link href='#'>Tables</Link>
              </li>
              <li>
                <Link href='#'>Beds</Link>
              </li>
              <li>
                <Link href='#'>Storage</Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className='text-white mb-4 font-light'>Company</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>About Us</Link>
              </li>
              <li>
                <Link href='#'>Sustainability</Link>
              </li>
              <li>
                <Link href='#'>Careers</Link>
              </li>
              <li>
                <Link href='#'>Contact</Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className='text-white mb-4 font-light'>Support</h3>
            <ul className='space-y-2 text-sm'>
              <li>
                <Link href='#'>Shipping & Returns</Link>
              </li>
              <li>
                <Link href='#'>FAQs</Link>
              </li>
              <li>
                <Link href='#'>Warranty</Link>
              </li>
              <li>
                <Link href='#'>Privacy Policy</Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className='py-8 flex flex-col md:flex-row items-center justify-between text-sm text-gray-500'>
          <p>© {new Date().getFullYear()} TFWoods. All rights reserved.</p>

          <div className='flex gap-6 mt-4 md:mt-0'>
            <a href='#' className='hover:text-white transition'>
              Instagram
            </a>
            <a href='#' className='hover:text-white transition'>
              Pinterest
            </a>
            <a href='#' className='hover:text-white transition'>
              Facebook
            </a>
          </div>
        </div>
      </Container>
    </footer>
  )
}
