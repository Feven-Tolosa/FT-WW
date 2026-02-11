'use client'
import FurnitureCard from '@/components/FurnitureCard'
import Hero from '@/components/Hero'

const furniture = [
  { id: 1, name: 'Wooden Chair', price: 3500 },
  { id: 2, name: 'Dining Table', price: 12000 },
  { id: 3, name: 'Bed Frame', price: 18000 },
  { id: 4, name: 'Wooden Chair', price: 3500 },
  { id: 5, name: 'Dining Table', price: 12000 },
  { id: 6, name: 'Bed Frame', price: 18000 },
  { id: 7, name: 'Wooden Chair', price: 3500 },
  { id: 8, name: 'Dining Table', price: 12000 },
  { id: 9, name: 'Bed Frame', price: 18000 },
  { id: 10, name: 'Wooden Chair', price: 3500 },
  { id: 11, name: 'Dining Table', price: 12000 },
  { id: 12, name: 'Bed Frame', price: 18000 },
]

export default function Home() {
  return (
    <>
      <Hero />
      {/* Furniture Section */}
      <section id='furniture' className='max-w-7xl mx-auto px-6 py-20'>
        <div className='columns-1 sm:columns-2 md:columns-3 gap-8'>
          {furniture.map((item) => (
            <div key={item.id} className='mb-8 break-inside-avoid'>
              <FurnitureCard name={item.name} price={item.price} />
            </div>
          ))}
        </div>
      </section>
    </>
  )
}
