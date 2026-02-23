import Image from 'next/image'

interface FurnitureCardProps {
  name: string
  image?: string
  price?: number
}

export default function FurnitureCard({
  name,
  image = '/images/1.png',
  price = 0,
}: FurnitureCardProps) {
  return (
    <div
      className='group bg-white overflow-hidden group-hover:-translate-y-1 transition-transform duration-500 hover:shadow-[0_20px_40px_rgba(0,0,0,0.08)] 
'
    >
      <div className='relative aspect-video '>
        <Image
          src={image}
          alt={name}
          fill
          className='
            object-cover
            transition-transform duration-1200ms ease-out
            group-hover:scale-110
          '
        />
      </div>
    </div>
  )
}
