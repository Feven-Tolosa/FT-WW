'use client'

import { useEffect, useState } from 'react'
import Aside from '@/components/Aside'
import { api, getToken, clearToken } from '@/lib/api'
import { useRouter } from 'next/navigation'

type Notification = {
  id: number
  message: string
  isRead: boolean
  createdAt: string
  order?: {
    id: number
    customerName: string
    customerPhone: string
    createdAt: string
    furniture: { name: string }
  } | null
}

export default function NotificationsPage() {
  const router = useRouter()
  const [items, setItems] = useState<Notification[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!getToken()) {
      clearToken()
      router.push('/admin/login')
      return
    }

    api<Notification[]>('/notifications')
      .then(setItems)
      .catch((err) => {
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          clearToken()
          router.push('/admin/login')
        }
      })
      .finally(() => setLoading(false))
  }, [router])

  const markRead = async (id: number) => {
    try {
      await api(`/notifications/${id}/read`, { method: 'PATCH' })
      setItems((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      )
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  const markAllRead = async () => {
    try {
      await api('/notifications/read-all', { method: 'POST' })
      setItems((prev) => prev.map((n) => ({ ...n, isRead: true })))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Failed')
    }
  }

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <div className='flex-1 p-8 mt-13'>
        <div className='flex justify-between items-center mb-6'>
          <h1 className='text-2xl px-3 font-semibold text-gray-800'>
            Order Notifications
          </h1>
          <button
            onClick={markAllRead}
            className='text-sm text-blue-600 hover:underline mr-3'
          >
            Mark all as read
          </button>
        </div>

        <div className='px-3 space-y-3'>
          {loading && <p className='text-gray-500'>Loading…</p>}

          {!loading && items.length === 0 && (
            <p className='text-gray-500'>No notifications yet.</p>
          )}

          {items.map((n) => (
            <div
              key={n.id}
              className={`bg-white rounded-lg shadow p-4 border-l-4 ${
                n.isRead ? 'border-gray-200 opacity-70' : 'border-[var(--wood)]'
              }`}
            >
              <div className='flex justify-between items-start gap-4'>
                <div>
                  <p className='font-medium text-gray-700'>
                    {!n.isRead && (
                      <span className='inline-block w-2 h-2 rounded-full bg-red-500 mr-2 align-middle' />
                    )}
                    {n.message}
                  </p>

                  {n.order && (
                    <p className='text-sm text-gray-500 mt-1'>
                      Selected furniture:{' '}
                      <span className='text-gray-700'>
                        {n.order.furniture.name}
                      </span>{' '}
                      · Order date:{' '}
                      <span className='text-gray-700'>
                        {new Date(n.order.createdAt).toLocaleDateString()}
                      </span>{' '}
                      · Client:{' '}
                      <a
                        href={`tel:${n.order.customerPhone}`}
                        className='text-blue-600 hover:underline'
                      >
                        {n.order.customerName} ({n.order.customerPhone})
                      </a>
                    </p>
                  )}
                </div>

                {!n.isRead && (
                  <button
                    onClick={() => markRead(n.id)}
                    className='shrink-0 text-sm text-gray-500 hover:text-gray-800 hover:underline'
                  >
                    Mark read
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
