import Link from 'next/dist/client/link'
import Image from 'next/image'

interface FurnitureCardProps {
  name: string
  price: number
  image?: string
}

export default function FurnitureCard({
  name,
  price,
  image = '/images/1.png',
}: FurnitureCardProps) {
  return (
    <div
      className='group relative bg-white overflow-hidden rounded-sm group-hover:-translate-y-1 transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)]
'
    >
      {/* Image wrapper */}
      <div className='relative aspect-[3/4] overflow-hidden'>
        <Image
          src={image}
          alt={name}
          fill
          className='
            object-cover
            transition-transform duration-[1200ms] ease-out
            group-hover:scale-110
          '
        />
      </div>

      {/* Content */}
      <div className='pt-4 pb-6 text-center'>
        <h3 className='text-gray-900 font-light tracking-wide'>{name}</h3>
        <p className='mt-1 text-sm text-gray-500'>
          ETB {price.toLocaleString()}
        </p>
      </div>

      {/* Hover action */}
      <div
        className='
          absolute inset-0
          flex items-end justify-center
          pb-7.5
          opacity-0
          group-hover:opacity-100
          transition-opacity duration-500
          pointer-events-none
        '
      >
        {/* <Link href={`/app/order?productId=${product.id}`}>
          <button className='mt-10 bg-black text-white px-10 py-3 text-sm tracking-wide hover:bg-gray-900 transition'>
            Order Now
          </button>
        </Link> */}
      </div>
    </div>
  )
}
