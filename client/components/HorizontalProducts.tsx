import FurnitureCard from './FurnitureCard'
interface Props {
  items: {
    id: string
    name: string
    price: number
    image: string
  }[]
}

export default function HorizontalProducts({ items }: Props) {
  return (
    <div className='relative'>
      <div
        className='
          flex gap-6
          overflow-x-auto
          scroll-smooth
          pb-4
          no-scrollbar
        '
      >
        {items.map((item) => (
          <div key={item.id} className='min-w-[260px]'>
            <FurnitureCard name={item.name} image={item.image} />
          </div>
        ))}
      </div>
    </div>
  )
}
