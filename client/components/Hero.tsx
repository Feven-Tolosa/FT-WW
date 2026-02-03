import Container from './Container'
import Image from 'next/image'
import { useEffect, useState } from 'react'

export default function Hero() {
  const slides = [
    {
      image: '/images/2.png',
      title: 'Transform Your Space',
      subtitle: 'with Timeless Elegance.',
      description: 'Handcrafted furniture designed for comfort and style.',
    },
    {
      image: '/images/3.png',
      title: 'Crafted with',
      subtitle: 'Natural Warmth.',
      description: 'Premium wood furniture built to last for generations.',
    },
    {
      image: '/images/4.png',
      title: 'Designed for',
      subtitle: 'Modern Living.',
      description: 'Minimal, elegant, and functional furniture collections.',
    },
  ]

  const [current, setCurrent] = useState(0)

  const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length)

  const prevSlide = () =>
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length)

  useEffect(() => {
    const timer = setInterval(nextSlide, 7000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className='relative h-[110vh]'>
      <button
        onClick={prevSlide}
        className='absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/40 text-white hover:border-amber-950 hover:text-amber-950 transition'
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/40 text-white hover:border-amber-950 hover:text-amber-950 transition'
      >
        →
      </button>

      {slides.map((slide, index) => (
        <Image
          key={slides[current].image}
          fill
          src={slides[current].image}
          alt='hero slide'
          priority
          className='
    absolute inset-0 object-cover
    animate-heroZoom
  '
        />
      ))}

      <div className='absolute inset-0 bg-black/50' />

      <div className='relative z-10 flex items-center h-full'>
        <Container>
          <div key={current} className='max-w-3xl'>
            {/* HEADLINE — fade only */}
            <h1
              className='
          text-white text-5xl md:text-6xl font-light tracking-wide leading-tight
          opacity-0 animate-heroFade
        '
            >
              {slides[current].title}
              <br />
              {slides[current].subtitle}
            </h1>

            {/* REST — slide + fade */}

            <p className='text-gray-200 mt-6 max-w-xl opacity-0 translate-y-6 animate-heroText delay-100'>
              {slides[current].description}
            </p>

            <button className='mt-8 flex items-center gap-3 text-white border-b border-white/60 hover:border-white transition-all opacity-0 translate-y-6 animate-heroText delay-200'>
              Shop now →
            </button>
          </div>
        </Container>
      </div>
    </section>
  )
}
