'use client'

import Link from 'next/link'
import Container from './Container'
import { Search, ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'

export default function Navbar() {
  return (
    <header className='fixed top-0 w-full z-50 bg-black/95 backdrop-blur-md shadow-md'>
      <Container>
        <nav className='flex items-center justify-between h-20'>
          {/* Logo */}
          <Link
            href='/'
            className='text-white text-xl font-light tracking-wider'
          >
            <Image src='/images/logos.png' alt='logo' width={50} height={50} />
          </Link>

          {/* Menu */}
          <ul className='hidden md:flex gap-6 text-white text-sm tracking-wide'>
            {['Shop', 'Chairs', 'Tables', 'Beds', 'About'].map((item) => (
              <li key={item}>
                <Link
                  href={`/${item.toLowerCase()}`}
                  className='relative group'
                >
                  {item}
                  <span
                    className='
                      absolute left-0 -bottom-1 w-0 h-[1px]
                      bg-white transition-all duration-300
                      group-hover:w-full
                    '
                  />
                </Link>
              </li>
            ))}
          </ul>

          {/* Icons */}
          <div className='flex items-center gap-6 text-white'>
            <button className='hover:opacity-70 transition'>
              <Search size={18} />
            </button>

            <button className='hover:opacity-70 transition'>
              <Heart size={18} />
            </button>

            <Link href='/cart' className='hover:opacity-70 transition'>
              <ShoppingCart size={18} />
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  )
}
