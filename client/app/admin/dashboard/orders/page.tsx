'use client'

import { useEffect, useState } from 'react'
import Aside from '@/components/Aside'
import { api, getToken, clearToken } from '@/lib/api'
import { useRouter } from 'next/navigation'

type Order = {
  id: number
  customerName: string
  customerPhone: string
  status: 'PENDING' | 'COMPLETED' | 'CANCELLED'
  createdAt: string
  furniture: { name: string; price: string | number }
}

const PAGE_SIZE = 6

export default function OrdersPage() {
  const router = useRouter()
  const [orders, setOrders] = useState<Order[]>([])

  // Search / filter / pagination
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!getToken()) {
      clearToken()
      router.push('/admin/login')
      return
    }

    api<Order[]>('/orders')
      .then(setOrders)
      .catch((err) => {
        if (err instanceof Error && err.message.includes('Unauthorized')) {
          clearToken()
          router.push('/admin/login')
        }
      })
  }, [router])

  const filtered = orders.filter((order) => {
    const matchesSearch =
      search.trim() === '' ||
      order.customerName.toLowerCase().includes(search.toLowerCase()) ||
      order.customerPhone.includes(search) ||
      order.furniture.name.toLowerCase().includes(search.toLowerCase())
    const matchesStatus =
      statusFilter === 'ALL' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageOrders = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  const updateStatus = async (id: number, status: Order['status']) => {
    try {
      const updated = await api<Order>(`/orders/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setOrders((prev) => prev.map((o) => (o.id === updated.id ? updated : o)))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Update failed')
    }
  }

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <div className='flex-1 p-8 mt-13'>
        <h1 className='text-2xl font-semibold mb-6 px-3 text-gray-800'>
          Client Orders
        </h1>

        {/* Search & Filter */}
        <div className='px-3 mb-4 flex gap-3'>
          <input
            type='text'
            placeholder='Search by client, phone or product…'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className='flex-1 max-w-xs border rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-gray-800'
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className='border rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-gray-800'
          >
            <option value='ALL'>All statuses</option>
            <option value='PENDING'>Pending</option>
            <option value='COMPLETED'>Completed</option>
            <option value='CANCELLED'>Cancelled</option>
          </select>
        </div>

        <div className='px-3'>
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
                {pageOrders.map((order) => (
                  <tr key={order.id} className='border-t'>
                    <td className='p-3'>{order.customerName}</td>
                    <td className='p-3'>
                      <a
                        href={`tel:${order.customerPhone}`}
                        className='text-blue-600 hover:underline'
                      >
                        {order.customerPhone}
                      </a>
                    </td>
                    <td className='p-3'>{order.furniture.name}</td>
                    <td className='p-3'>
                      {Number(order.furniture.price).toLocaleString()} ETB
                    </td>
                    <td className='p-3'>
                      <span
                        className={`px-2 py-1 rounded text-sm ${
                          order.status === 'PENDING'
                            ? 'bg-yellow-100 text-yellow-800'
                            : order.status === 'COMPLETED'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {order.status.toLowerCase()}
                      </span>
                    </td>
                    <td className='p-3 space-x-3'>
                      {order.status === 'PENDING' && (
                        <>
                          <button
                            onClick={() =>
                              updateStatus(order.id, 'COMPLETED')
                            }
                            className='text-green-600 hover:underline'
                          >
                            Mark Completed
                          </button>
                          <button
                            onClick={() =>
                              updateStatus(order.id, 'CANCELLED')
                            }
                            className='text-red-600 hover:underline'
                          >
                            Cancel
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filtered.length === 0 && (
              <p className='p-6 text-gray-500 text-center'>
                No orders found.
              </p>
            )}

            {/* Pagination */}
            {filtered.length > 0 && (
              <div className='flex justify-between items-center p-3 border-t text-sm text-gray-500'>
                <span>
                  {(safePage - 1) * PAGE_SIZE + 1}–
                  {Math.min(safePage * PAGE_SIZE, filtered.length)} of{' '}
                  {filtered.length}
                </span>
                <div className='space-x-2'>
                  <button
                    disabled={safePage <= 1}
                    onClick={() => setPage(safePage - 1)}
                    className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50'
                  >
                    Prev
                  </button>
                  <span>
                    Page {safePage} of {totalPages}
                  </span>
                  <button
                    disabled={safePage >= totalPages}
                    onClick={() => setPage(safePage + 1)}
                    className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50'
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
