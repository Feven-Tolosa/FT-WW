import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    name: 'Chairs',
    image: '/images/category-chairs.jpg',
    slug: 'chairs',
  },
  {
    name: 'Tables',
    image: '/images/category-tables.jpg',
    slug: 'tables',
  },
  {
    name: 'Sofas',
    image: '/images/category-sofas.jpg',
    slug: 'sofas',
  },
  {
    name: 'Beds',
    image: '/images/category-beds.jpg',
    slug: 'beds',
  },
]

export default function ShopByCategory() {
  return (
    <section className='py-28'>
      <div className='max-w-6xl mx-auto px-6'>
        {/* Title */}
        <div className='text-center mb-16'>
          <h2 className='text-3xl md:text-4xl font-light tracking-wide'>
            Shop by Category
          </h2>
        </div>

        {/* Grid */}
        <div className='grid md:grid-cols-2 gap-8'>
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className='group relative overflow-hidden'
            >
              {/* Image */}
              <div className='relative aspect-[4/3]'>
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className='
                    object-cover
                    transition-transform duration-[1200ms] ease-out
                    group-hover:scale-110
                  '
                />
              </div>

              {/* Overlay */}
              <div
                className='
                absolute inset-0
                bg-black/30
                flex items-center justify-center
              '
              >
                <h3
                  className='
                  text-white text-2xl md:text-3xl
                  font-light tracking-wide
                  transition
                  group-hover:tracking-widest
                '
                >
                  {category.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
