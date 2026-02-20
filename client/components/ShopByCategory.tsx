import Image from 'next/image'
import Link from 'next/link'

export default function ShopByCategory() {
  return (
    <section className='py-32'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Title */}
        <div className='mb-20 text-center'>
          <h2 className='text-4xl font-light tracking-wide'>
            Shop by Category
          </h2>
        </div>

        {/* Magazine Layout */}
        <div className='grid grid-cols-1 md:grid-cols-4 gap-6 auto-rows-[250px]'>
          {/* Large Top */}
          <Link
            href='/category/chairs'
            className='group relative md:col-span-4 overflow-hidden'
          >
            <Image
              src='/images/category-chairs.jpg'
              alt='Chairs'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h3 className='text-white text-3xl font-light tracking-wide'>
                Chairs
              </h3>
            </div>
          </Link>

          {/* Small Left */}
          <Link
            href='/category/tables'
            className='group relative md:col-span-2 overflow-hidden'
          >
            <Image
              src='/images/category-tables.jpg'
              alt='Tables'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h3 className='text-white text-2xl font-light'>Tables</h3>
            </div>
          </Link>

          {/* Tall Right */}
          <Link
            href='/category/sofas'
            className='group relative md:col-span-2 md:row-span-2 overflow-hidden'
          >
            <Image
              src='/images/category-sofas.jpg'
              alt='Sofas'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h3 className='text-white text-3xl font-light'>Sofas</h3>
            </div>
          </Link>

          {/* Bottom Large */}
          <Link
            href='/category/beds'
            className='group relative md:col-span-4 overflow-hidden'
          >
            <Image
              src='/images/category-beds.jpg'
              alt='Beds'
              fill
              className='object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-105'
            />
            <div className='absolute inset-0 bg-black/30 flex items-center justify-center'>
              <h3 className='text-white text-3xl font-light'>Beds</h3>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
