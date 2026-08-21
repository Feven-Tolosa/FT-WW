import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import FurnitureCard from '@/components/FurnitureCard'
import Hero from '@/components/Hero'
import HorizontalProducts from '@/components/HorizontalProducts'
import ShopByCategory from '@/components/ShopByCategory'
import WhyChooseUs from '@/components/WhyChooseUs'
import { furnitures } from '@/data/furnitures'

export default function Home() {
  const featured = furnitures.slice(0, 4)

  return (
    <>
      <Hero />

      {/* Featured products */}
      <section className='py-20 md:py-28'>
        <div className='mx-auto max-w-[1400px] px-6'>
          <div className='mb-12 flex flex-col gap-4 md:flex-row md:items-end md:justify-between'>
            <div>
              <p className='mb-3 flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-wood-600'>
                <span className='h-px w-8 bg-wood-400' />
                Best Sellers
              </p>
              <h2 className='text-3xl font-light tracking-tight text-stone-900 md:text-4xl'>
                Featured Pieces
              </h2>
            </div>

            <Link
              href='/category/chairs'
              className='group inline-flex w-fit items-center gap-2 border-b border-stone-300 pb-1 text-sm uppercase tracking-widest text-stone-600 transition-colors hover:border-wood-600 hover:text-wood-700'
            >
              View All
              <ArrowRight
                size={14}
                className='transition-transform duration-300 group-hover:translate-x-1'
              />
            </Link>
          </div>

          <div className='grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4'>
            {featured.map((item) => (
              <FurnitureCard
                key={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
                href={`/furniture/${item.id}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Auto-scrolling collection */}
      <HorizontalProducts items={furnitures} />

      <ShopByCategory />

      <WhyChooseUs />

      {/* CTA banner */}
      <section className='relative overflow-hidden'>
        <div className='relative h-[420px] md:h-[480px]'>
          <Image
            src='/images/3.png'
            alt='Custom furniture workshop'
            fill
            sizes='100vw'
            className='object-cover'
          />
          <div className='absolute inset-0 bg-stone-950/70' />

          <div className='relative flex h-full flex-col items-center justify-center px-6 text-center'>
            <p className='mb-4 text-xs font-medium uppercase tracking-[0.3em] text-wood-300'>
              Made Just for You
            </p>
            <h2 className='max-w-2xl text-3xl font-light tracking-tight text-white md:text-5xl'>
              Have a piece in mind? We build it to order.
            </h2>
            <p className='mt-4 max-w-xl text-sm leading-relaxed text-white/70 md:text-base'>
              From bespoke dining tables to full living-room sets — tell us your
              vision and our craftsmen will bring it to life.
            </p>
            <Link
              href='/order'
              className='mt-8 inline-flex items-center gap-3 bg-white px-8 py-4 text-sm font-medium uppercase tracking-widest text-stone-900 transition-colors duration-300 hover:bg-wood-400 hover:text-white'
            >
              Start a Custom Order
              <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
