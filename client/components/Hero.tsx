import React from 'react'
import Container from './Container'
import Image from 'next/image'

export default function Hero() {
  return (
    <section className='relative h-[95vh]'>
      <Image
        fill
        priority
        sizes='100vw'
        alt='hero image'
        src='/images/2.png'
        className='absolute inset-0 w-full h-full object-cover'
      />

      <div className='absolute inset-0 bg-black/50' />

      <div className='relative z-10 flex items-center h-full'>
        <Container>
          <h1 className='text-white text-5xl md:text-6xl font-light max-w-3xl tracking-wide leading-tight'>
            Transform Your Space <br /> with Timeless Elegance.
          </h1>

          <p className='text-gray-200 mt-6 max-w-xl'>
            Handcrafted furniture designed for comfort and style.
          </p>

          <button className='mt-8 flex items-center gap-3 text-white border-b'>
            Shop now →
          </button>
        </Container>
      </div>
    </section>
  )
}
