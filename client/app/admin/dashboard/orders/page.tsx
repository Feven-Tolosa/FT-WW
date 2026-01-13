'use client'

import Aside from '@/components/Aside'
import { useState } from 'react'
export default function OrdersPage() {
  type Order = {
    id: number
    clientName: string
    phone: string
    product: string
    price: number
    status: 'pending' | 'completed'
  }

  const initialOrders: Order[] = [
    {
      id: 1,
      clientName: 'Abel Tesfaye',
      phone: '0912345678',
      product: 'Wooden Chair',
      price: 4500,
      status: 'pending',
    },
    {
      id: 2,
      clientName: 'Hanna Bekele',
      phone: '0923456789',
      product: 'Dining Table',
      price: 18000,
      status: 'completed',
    },
  ]

  const [orders, setOrders] = useState(initialOrders)

  const markCompleted = (id: number) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status: 'completed' } : order
      )
    )
  }

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <div className='flex-1 p-8 mt-13'>
        <h1 className='text-2xl font-semibold mb-6 text-gray-800'>
          Client Orders
        </h1>

        <div className='bg-white rounded-lg shadow overflow-x-auto text-gray-600'>
          <table className='w-full text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='p-3'>Client</th>
                <th className='p-3'>Phone</th>
                <th className='p-3'>Product</th>
                <th className='p-3'>Price</th>
                <th className='p-3'>Status</th>
                <th className='p-3'>Action</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order) => (
                <tr key={order.id} className='border-t'>
                  <td className='p-3'>{order.clientName}</td>
                  <td className='p-3'>
                    <a
                      href={`tel:${order.phone}`}
                      className='text-blue-600 hover:underline'
                    >
                      {order.phone}
                    </a>
                  </td>
                  <td className='p-3'>{order.product}</td>
                  <td className='p-3'>{order.price} ETB</td>
                  <td className='p-3'>
                    <span
                      className={`px-2 py-1 rounded text-sm ${
                        order.status === 'pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className='p-3'>
                    {order.status === 'pending' && (
                      <button
                        onClick={() => markCompleted(order.id)}
                        className='text-green-600 hover:underline'
                      >
                        Mark Completed
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
