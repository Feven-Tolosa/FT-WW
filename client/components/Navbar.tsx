'use client'

import Link from 'next/link'
import Container from './Container'
import { Search, ShoppingCart, Heart } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

export default function Navbar() {
  const categories = [
    {
      name: 'Chairs',
      items: ['Dining Chairs', 'Office Chairs', 'Armchairs'],
      image: '/images/chair-category.jpg',
    },
    {
      name: 'Tables',
      items: ['Dining Tables', 'Coffee Tables', 'Side Tables'],
      image: '/images/table-category.jpg',
    },
    {
      name: 'Beds',
      items: ['Bed Frames', 'Night Stands'],
      image: '/images/bed-category.jpg',
    },
  ]

  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <header className='fixed top-0 w-full z-50 bg-black/60 backdrop-blur-md shadow-md'>
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
            <li className='relative group'>
              <span className='cursor-pointer'>Shop</span>
              {/* Mega menu */}
              <div
                className='
    absolute top-full -translate-x-1/2
    w-screen left-11 mt-7
    bg-black text-white
    opacity-0 invisible
    group-hover:opacity-100 group-hover:visible
    transition-all duration-300
    py-12 px-10 
  '
              >
                <div className='grid grid-cols-4 gap-10'>
                  {categories.map((cat) => (
                    <div key={cat.name}>
                      <h3 className='mb-4 font-light tracking-wide'>
                        {cat.name}
                      </h3>

                      <ul className='space-y-2 text-sm text-gray-300'>
                        {cat.items.map((item) => (
                          <li key={item}>
                            <a className='hover:text-white transition'>
                              {item}
                            </a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}

                  {/* Promo Image */}
                  <div className='col-span-1'>
                    <img
                      src='/images/1.png'
                      className='w-full h-full object-cover'
                      alt='Furniture'
                    />
                  </div>
                </div>
              </div>
            </li>
          </ul>

          {/* Icons */}
          <div className='flex items-center gap-6 text-white'>
            <button onClick={() => setSearchOpen(true)}>
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

      {searchOpen && (
        <div className='fixed inset-0 z-[100] bg-black/95 flex items-center justify-center'>
          {/* Close */}
          <button
            onClick={() => setSearchOpen(false)}
            className='absolute top-8 right-10 text-white text-xl'
          >
            ✕
          </button>

          {/* Search Box */}
          <div className='w-full max-w-2xl px-6'>
            <input
              autoFocus
              placeholder='Search furniture...'
              className='
          w-full bg-transparent border-b
          border-white/40 text-white
          text-2xl font-light
          py-4 outline-none
        '
            />

            <p className='mt-6 text-gray-400 text-sm'>
              Try searching for chairs, tables, beds…
            </p>
          </div>
        </div>
      )}
    </header>
  )
}
