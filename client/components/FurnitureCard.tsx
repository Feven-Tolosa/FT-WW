import Image from 'next/image'
import Link from 'next/link'
import { Heart, ShoppingBag } from 'lucide-react'

interface FurnitureCardProps {
  name: string
  image?: string
  price?: number
  href?: string
}

export default function FurnitureCard({
  name,
  image = '/images/1.png',
  price = 0,
  href,
}: FurnitureCardProps) {
  return (
    <div className='group'>
      <Link
        href={href ?? '#'}
        className='relative block aspect-[4/5] overflow-hidden bg-wood-100'
      >
        <Image
          src={image}
          alt={name}
          fill
          sizes='(max-width: 768px) 100vw, 33vw'
          className='object-cover transition-transform duration-700 ease-out group-hover:scale-105'
        />

        {/* Quick actions */}
        <div className='absolute inset-x-0 bottom-0 flex translate-y-full items-center justify-center gap-3 bg-gradient-to-t from-black/60 to-transparent p-5 transition-transform duration-500 ease-out group-hover:translate-y-0'>
          <span className='flex items-center gap-2 bg-white px-6 py-3 text-xs font-medium uppercase tracking-widest text-stone-900 transition-colors hover:bg-stone-900 hover:text-white'>
            <ShoppingBag size={14} />
            Add to Cart
          </span>
          <button
            aria-label='Add to wishlist'
            className='flex h-10 w-10 items-center justify-center rounded-full bg-white text-stone-900 transition-colors hover:bg-red-50 hover:text-red-500'
          >
            <Heart size={15} />
          </button>
        </div>
      </Link>

      <div className='flex items-start justify-between gap-4 pt-4'>
        <div>
          <h3 className='text-sm font-medium tracking-wide text-stone-900'>
            <Link href={href ?? '#'} className='hover:text-wood-700'>
              {name}
            </Link>
          </h3>
          <p className='mt-1 text-xs uppercase tracking-widest text-stone-400'>
            Solid Wood
          </p>
        </div>
        {price > 0 && (
          <p className='text-sm font-medium text-wood-800'>
            ETB {price.toLocaleString()}
          </p>
        )}
      </div>
    </div>
  )
}
