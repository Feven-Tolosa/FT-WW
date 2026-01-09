'use client'
import FurnitureCard from '@/components/FurnitureCard'

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
      {/* Hero Section */}
      <section className='bg-gray-50 py-20 mt-15 min-h-screen bg-cover bg-center bg-[url("/images/2.png")] flex items-center'>
        <div className='max-w-7xl mx-auto px-6 text-center'>
          <h1 className='text-4xl md:text-5xl font-bold mb-6  '>
            Crafted Furniture for Everyday Living
          </h1>
          <p className=' max-w-2xl mx-auto mb-8'>
            Discover quality wooden furniture made with care, durability, and
            timeless design.
          </p>
          <a
            href='#furniture'
            className='inline-block bg-[var(--wood)] text-white px-6 py-3 rounded hover:bg-[var(--wood-dark)]'
          >
            Browse Furniture
          </a>
        </div>
      </section>

      {/* Furniture Section */}
      <section id='furniture' className='max-w-7xl mx-auto px-6 py-20'>
        <h2 className='text-2xl font-semibold mb-8 text-[var(--wood)]'>
          Available Furniture
        </h2>

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
