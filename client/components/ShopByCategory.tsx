import Image from 'next/image'
import Link from 'next/link'

export default function ShopByCategory() {
  return (
    <section className='py-10 bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Title */}
        <div className='mb-20 text-center'>
          <h2 className='text-4xl text-amber-950 font-light tracking-wide'>
            Shop by Category
          </h2>
        </div>

        {/* Magazine Layout */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[300px]'>
          {/* Large Top */}
          <Link
            href='/category/sofas'
            className='group relative md:col-span-4 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Sofas'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              {/* Main Title */}
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3
  '
              >
                Sofas
              </h3>

              {/* Subheading */}
              <span
                className='
    text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0
  '
              >
                Modern Comfort Collection
              </span>
            </div>
          </Link>

          {/* Small Left */}
          <Link
            href='/category/tables'
            className='group relative md:col-span-2 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Tables'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3'
              >
                Tables
              </h3>
              <span
                className='
    text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0'
              >
                Contemporary Dining
              </span>
            </div>
          </Link>

          {/* Tall Right */}
          <Link
            href='/category/Dining'
            className='group relative md:col-span-2 md:row-span-2 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Modern Dining'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3'
              >
                Dining
              </h3>
              <span
                className=' text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0'
              >
                Elegant Gatherings
              </span>
            </div>
          </Link>

          {/* Tall Left */}
          <Link
            href='/category/Kitchen'
            className='group relative md:col-span-2 md:row-span-2 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Kitchen'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3'
              >
                Kitchen
              </h3>
              <span
                className=' text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0'
              >
                Functional Beauty
              </span>
            </div>
          </Link>

          {/* Small Right */}
          <Link
            href='/category/chairs'
            className='group relative md:col-span-2 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Chairs'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3'
              >
                Chairs
              </h3>
              <span
                className=' text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0'
              >
                Crafted Seating
              </span>
            </div>
          </Link>

          {/* Bottom Large */}
          <Link
            href='/category/beds'
            className='group relative md:col-span-4 overflow-hidden'
          >
            <Image
              src='/images/3.png'
              alt='Beds'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex flex-col items-center justify-center overflow-hidden'>
              <h3
                className='
    text-white text-3xl font-light tracking-wide
    transition-all duration-500
    group-hover:-translate-y-3'
              >
                Beds
              </h3>
              <span
                className=' text-white/80 text-sm tracking-widest mt-2
    opacity-0 translate-y-4
    transition-all duration-500
    group-hover:opacity-100
    group-hover:translate-y-0'
              >
                Rest in Luxury
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
