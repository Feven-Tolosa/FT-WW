import { furniture } from '@/data/furniture'
import Image from 'next/image'
import Container from '@/components/Container'
import FurnitureCard from '@/components/FurnitureCard'
import Link from 'next/dist/client/link'

interface Props {
  params: { id: string }
}

export default function ProductPage({ params }: Props) {
  const product = furniture.find((item) => item.id === params.id)

  if (!product) {
    return <div className='pt-40 text-center'>Product not found</div>
  }

  // 🔑 Related furniture (same category, different product)
  const relatedFurniture = furniture.filter(
    (item) => item.category === product.category && item.id !== product.id,
  )

  return (
    <section className='pt-32 pb-24'>
      <Container>
        {/* Product Info */}
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16'>
          {/* Image */}
          <div className='relative aspect-[1/3]'>
            <Image
              src={product.image}
              alt={product.name}
              fill
              className='object-cover'
            />
          </div>

          {/* Details */}
          <div>
            <h1 className='text-3xl font-light tracking-wide'>
              {product.name}
            </h1>
            <p className='mt-4 text-xl text-gray-700'>
              ETB {product.price.toLocaleString()}
            </p>
            <p className='mt-6 text-gray-600 leading-relaxed'>
              {product.description}
            </p>

            <Link href={`/order?productId=${product.id}`}>
              <button className='mt-10 bg-black text-white px-10 py-3 text-sm tracking-wide hover:bg-gray-900 transition'>
                Order Now
              </button>
            </Link>
          </div>
        </div>

        {/* Related Furniture */}
        {relatedFurniture.length > 0 && (
          <div className='mt-28'>
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
