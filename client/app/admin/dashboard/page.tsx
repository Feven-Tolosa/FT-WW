'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Aside from '@/components/Aside'
import { api, getToken, clearToken } from '@/lib/api'

type Furniture = { id: number; name: string; price: string | number }
type Order = {
  id: number
  customerName: string
  customerPhone: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  furniture: { name: string }
  createdAt: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [furnitureCount, setFurnitureCount] = useState<number | null>(null)
  const [pendingCount, setPendingCount] = useState<number | null>(null)
  const [unreadCount, setUnreadCount] = useState<number | null>(null)
  const [recentOrders, setRecentOrders] = useState<Order[]>([])

  useEffect(() => {
    if (!getToken()) {
      clearToken()
      router.push('/admin/login')
      return
    }

    api<Furniture[]>('/furniture')
      .then((items) => setFurnitureCount(items.length))
      .catch(() => setFurnitureCount(0))

    api<Order[]>('/orders')
      .then((orders) => {
        setPendingCount(
          orders.filter((o) => o.status === 'PENDING').length
        )
        setRecentOrders(orders.slice(0, 5))
      })
      .catch((err) => {
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          clearToken()
          router.push('/admin/login')
          return
        }
        setPendingCount(0)
        setRecentOrders([])
      })

    api<{ isRead: boolean }[]>('/notifications')
      .then((notifs) =>
        setUnreadCount(notifs.filter((n) => !n.isRead).length)
      )
      .catch(() => setUnreadCount(0))
  }, [router])

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <main className='flex-1 p-8 mt-13'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-6'>
          Dashboard Overview
        </h1>

        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
          <StatCard
            title='Total Furniture'
            value={furnitureCount === null ? '…' : String(furnitureCount)}
          />
          <StatCard
            title='Pending Orders'
            value={pendingCount === null ? '…' : String(pendingCount)}
          />
          <StatCard
            title='Unread Notifications'
            value={unreadCount === null ? '…' : String(unreadCount)}
          />
        </div>

        <Link
          href='/admin/dashboard/notifications'
          className='text-sm text-blue-600 hover:underline mb-4 inline-block'
        >
          View notifications →
        </Link>

        <section className='bg-white rounded-lg p-6 shadow'>
          <h2 className='font-semibold mb-4 text-gray-600'>Recent Orders</h2>

          {recentOrders.length === 0 ? (
            <p className='text-gray-500'>No orders yet.</p>
          ) : (
            <table className='w-full text-sm text-left text-gray-600'>
              <thead className='bg-gray-50 text-gray-500'>
                <tr>
                  <th className='p-3'>Customer</th>
                  <th className='p-3'>Phone</th>
                  <th className='p-3'>Product</th>
                  <th className='p-3'>Status</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map((o) => (
                  <tr key={o.id} className='border-t'>
                    <td className='p-3'>{o.customerName}</td>
                    <td className='p-3'>{o.customerPhone}</td>
                    <td className='p-3'>{o.furniture.name}</td>
                    <td className='p-3'>
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          o.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : o.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {o.status.toLowerCase()}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <Link
            href='/admin/dashboard/orders'
            className='inline-block mt-4 text-sm text-blue-600 hover:underline'
          >
            View all orders →
          </Link>
        </section>
      </main>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className='bg-white rounded-lg p-6 shadow'>
      <p className='text-sm text-gray-500 mb-1'>{title}</p>
      <p className='text-2xl font-bold text-gray-700'>{value}</p>
    </div>
  )
}
