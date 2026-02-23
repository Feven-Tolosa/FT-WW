'use client'
import FurnitureCard from '@/components/FurnitureCard'
import Hero from '@/components/Hero'
import HorizontalProducts from '@/components/HorizontalProducts'
import ShopByCategory from '@/components/ShopByCategory'
import WhyChooseUs from '@/components/WhyChooseUs'
import { furnitures } from '@/data/furnitures'

const furniture = [
  { id: 1, name: 'Wooden Chair', price: 3500 },
  { id: 2, name: 'Dining Table', price: 12000 },
]

export default function Home() {
  return (
    <>
      <Hero />

      <div className='columns-1 md:columns-2 gap-0 pb-5'>
        {furniture.map((item) => (
          <div key={item.id}>
            <FurnitureCard name={item.name} />
          </div>
        ))}
      </div>
      <HorizontalProducts items={furnitures} />
      <ShopByCategory />
      <WhyChooseUs />
      <div className='columns-1 md:columns-2 gap-0 pb-5'>
        {furniture.map((item) => (
          <div key={item.id}>
            <FurnitureCard name={item.name} />
          </div>
        ))}
      </div>
      <HorizontalProducts items={furnitures} />
    </>
  )
}
