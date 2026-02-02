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
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length)
    }, 6000) // slow & elegant

    return () => clearInterval(interval)
  }, [])
  return (
    <section className='relative h-[110vh]'>
      <button
        onClick={prevSlide}
        className='absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/40 text-white hover:border-white transition'
      >
        ←
      </button>
      <button
        onClick={nextSlide}
        className='absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-white/40 text-white hover:border-white transition'
      >
        →
      </button>

      {slides.map((slide, index) => (
        <Image
          key={slide.image}
          fill
          src={slide.image}
          alt='hero slide'
          priority={index === 0}
          className={`
      absolute inset-0 object-cover transition-opacity duration-1000
      ${index === current ? 'opacity-100' : 'opacity-0'}
    `}
        />
      ))}

      <div className='absolute inset-0 bg-black/50' />

      <div className='relative z-10 flex items-center h-full'>
        <Container>
          <div className='max-w-3xl transition-opacity duration-7000'>
            <h1 className='text-white text-5xl md:text-6xl font-light tracking-wide leading-tight'>
              {slides[current].title}
              <br />
              {slides[current].subtitle}
            </h1>

            <p className='text-gray-200 mt-6 max-w-xl'>
              {slides[current].description}
            </p>

            <button className='mt-8 flex items-center gap-3 text-white border-b border-white/60 hover:border-white transition-all'>
              Shop now →
            </button>
          </div>
        </Container>
      </div>
    </section>
  )
}
