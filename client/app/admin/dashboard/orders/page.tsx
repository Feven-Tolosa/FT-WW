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

const statusStyles: Record<Order['status'], string> = {
  PENDING: 'bg-yellow-100 text-yellow-800',
  COMPLETED: 'bg-green-100 text-green-800',
  CANCELLED: 'bg-red-100 text-red-800',
}

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
    <div className='min-h-screen flex bg-stone-100'>
      <Aside />

      <main className='flex-1 p-6 md:p-10'>
        <div className='mb-8'>
          <p className='mb-1 text-xs font-medium uppercase tracking-[0.3em] text-wood-700'>
            Orders
          </p>
          <h1 className='admin-page-title'>Client Orders</h1>
        </div>

        {/* Search & Filter */}
        <div className='mb-6 flex flex-wrap gap-3'>
          <input
            type='text'
            placeholder='Search by client, phone or product…'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className='admin-input max-w-xs'
          />
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value)
              setPage(1)
            }}
            className='admin-input w-auto'
          >
            <option value='ALL'>All statuses</option>
            <option value='PENDING'>Pending</option>
            <option value='COMPLETED'>Completed</option>
            <option value='CANCELLED'>Cancelled</option>
          </select>
        </div>

        <div className='admin-card overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th className='admin-th'>Client</th>
                  <th className='admin-th'>Phone</th>
                  <th className='admin-th'>Product</th>
                  <th className='admin-th'>Price</th>
                  <th className='admin-th'>Status</th>
                  <th className='admin-th'>Action</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-stone-200'>
                {pageOrders.map((order) => (
                  <tr key={order.id} className='hover:bg-stone-50'>
                    <td className='admin-td font-medium'>{order.customerName}</td>
                    <td className='admin-td'>
                      <a
                        href={`tel:${order.customerPhone}`}
                        className='text-wood-700 hover:underline'
                      >
                        {order.customerPhone}
                      </a>
                    </td>
                    <td className='admin-td'>{order.furniture.name}</td>
                    <td className='admin-td'>
                      {Number(order.furniture.price).toLocaleString()} ETB
                    </td>
                    <td className='admin-td'>
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs ${statusStyles[order.status]}`}
                      >
                        {order.status.toLowerCase()}
                      </span>
                    </td>
                    <td className='admin-td'>
                      <div className='inline-flex gap-4'>
                        {order.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() =>
                                updateStatus(order.id, 'COMPLETED')
                              }
                              className='text-sm text-wood-700 hover:underline'
                            >
                              Mark Completed
                            </button>
                            <button
                              onClick={() =>
                                updateStatus(order.id, 'CANCELLED')
                              }
                              className='text-sm text-red-600 hover:underline'
                            >
                              Cancel
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <p className='py-12 text-center text-sm text-stone-500'>
              No orders found.
            </p>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 p-4 text-sm text-stone-500'>
              <span>
                {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length}
              </span>
              <div className='inline-flex items-center gap-2'>
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className='admin-btn-ghost px-3 py-1 disabled:opacity-40'
                >
                  Prev
                </button>
                <span>
                  Page {safePage} of {totalPages}
                </span>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className='admin-btn-ghost px-3 py-1 disabled:opacity-40'
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}