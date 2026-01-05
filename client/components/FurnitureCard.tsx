import Image from 'next/image'

type FurnitureCardProps = {
  name: string
  price: number
  imageUrl?: string // optional, for future backend images
}

export default function FurnitureCard({
  name,
  price,
  imageUrl,
}: FurnitureCardProps) {
  return (
    <div className='bg-white border rounded-lg overflow-hidden hover:shadow-lg transition'>
      {/* Image Section */}
      <div className='relative h-52 w-full'>
        <Image
          src={imageUrl || '/images/1.png'}
          alt={name}
          fill
          className='object-cover'
          priority
        />
      </div>

      {/* Content */}
      <div className='p-4'>
        <h3 className='font-semibold text-lg mb-1'>{name}</h3>
        <p className='text-gray-600 mb-4'>{price} ETB</p>

        <button className='w-full bg-[var(--wood)] text-white py-2 rounded hover:bg-[var(--wood-dark)]'>
          Order Now
        </button>
      </div>
    </div>
  )
}
