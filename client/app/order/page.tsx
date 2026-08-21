'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Suspense } from 'react'
import Image from 'next/image'
import Container from '@/components/Container'
import { furnitures } from '@/data/furnitures'
import { api } from '@/lib/api'

type Product = {
  id: number
  name: string
  price: string | number
  imageUrl?: string | null
}

function OrderPageContent() {
  const searchParams = useSearchParams()
  const productId = searchParams.get('productId')

  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [orderId, setOrderId] = useState<number | null>(null)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!productId) {
      setLoading(false)
      return
    }

    api<Product>(`/furniture/${productId}`)
      .then(setProduct)
      .catch(() => {
        // Fallback to bundled sample data so old links still work
        const local = furnitures.find((item) => item.id === productId)
        if (local) {
          setProduct({
            id: Number(local.id),
            name: local.name,
            price: local.price,
            imageUrl: local.image,
          })
        }
      })
      .finally(() => setLoading(false))
  }, [productId])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!product) return
    setSubmitting(true)
    setError('')

    try {
      const order = await api<{ id: number }>('/orders', {
        method: 'POST',
        body: JSON.stringify({
          customerName,
          customerPhone,
          furnitureId: product.id,
        }),
      })
      setOrderId(order.id)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Order failed')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <div className='pt-40 text-center text-gray-500'>Loading…</div>
  }

  if (!product) {
    return <div className='pt-40 text-center'>Product not found</div>
  }

  return (
    <section className='pt-32 pb-24'>
      <Container>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-16 mb-24'>
          {/* Image */}
          <div className='relative aspect-[3/4]'>
            <Image
              src={product.imageUrl || '/images/1.png'}
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
              ETB {Number(product.price).toLocaleString()}
            </p>

            {orderId ? (
              <div className='mt-10 border border-green-200 bg-green-50 rounded p-6'>
                <p className='text-green-800 font-medium'>
                  Order #{orderId} placed successfully!
                </p>
                <p className='text-sm text-green-700 mt-1'>
                  We will contact you on {customerPhone} to confirm your
                  order.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className='mt-10 space-y-6'>
                {error && (
                  <p className='text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2'>
                    {error}
                  </p>
                )}

                <div>
                  <label className='block text-sm mb-2'>Full Name</label>
                  <input
                    type='text'
                    required
                    placeholder='Your name'
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black'
                  />
                </div>

                <div>
                  <label className='block text-sm mb-2'>Phone Number</label>
                  <input
                    type='tel'
                    required
                    placeholder='09XXXXXXXX'
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className='w-full border border-gray-300 px-4 py-3 focus:outline-none focus:border-black'
                  />
                </div>

                <button
                  type='submit'
                  disabled={submitting}
                  className='w-full mt-6 bg-black text-white py-3 text-sm tracking-wide hover:bg-gray-900 transition disabled:opacity-50'
                >
                  {submitting ? 'Placing order…' : 'Confirm Order'}
                </button>

                <p className='text-xs text-gray-400 text-center'>
                  No account needed — we call you to confirm.
                </p>
              </form>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className='pt-40 text-center'>Loading…</div>}>
      <OrderPageContent />
    </Suspense>
  )
}
