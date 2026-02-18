'use client'

import { useSearchParams } from 'next/navigation'
import { furniture } from '@/data/furnitures'
import Image from 'next/image'
import Container from '@/components/Container'
import FurnitureCard from '@/components/FurnitureCard'

export default function OrderPage() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')

  const product = furniture.find((item) => item.id === productId)

  if (!product) {
    return <div className='pt-40 text-center'>Product not found</div>
  }

  const relatedFurniture = furniture.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )

  return (
    <section className='pt-32 pb-24'>
      <Container>
        {/* Selected Product */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-24'>
          {/* Image */}
          <div className='relative aspect-[3/4]'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
            />
          </div>

          {/* Order Form */}
          <div>
            <h1 className='text-3xl font-light tracking-wide'>
              Order {product.name}
            </h1>

            <p className='mt-2 text-gray-600'>
              ETB {product.price.toLocaleString()}
            </p>

            <form className='mt-10 space-y-6'>
              <div>
                <label className='block text-sm mb-2'>Full Name</label>
                <input
                  type='text'
                  placeholder='Your name'
                  className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black'
                />
              </div>

              <div>
                <label className='block text-sm mb-2'>Phone Number</label>
                <input
                  type='tel'
                  placeholder='09XXXXXXXX'
                  className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black'
                />
              </div>

              <button
                type='submit'
                className='w-full mt-6 bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-900 transition'
              >
                Confirm Order
              </button>
            </form>
          </div>
        </div>

        {/* Related Furniture */}
        {relatedFurniture.length > 0 && (
          <div>
            <h2 className='text-2xl font-light mb-10'>You may also like</h2>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8'>
              {relatedFurniture.map((item) => (
                <FurnitureCard
                  key={item.id}
                  name={item.name}
                  price={item.price}
                  image={item.image}
                />
              ))}
            </div>
          </div>
        )}
      </Container>
    </section>
  )
}
