'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { clearToken } from '@/lib/api'

function Aside() {
  const router = useRouter()

  const handleLogout = () => {
    clearToken()
    router.push('/admin/login')
  }

  return (
    <aside className='w-64 bg-white border-r p-6 pt-25 flex flex-col'>
      <h2 className='text-xl font-bold text-[var(--wood)] mb-8'>
        Admin Panel
      </h2>

      <nav className='space-y-4 text-sm'>
        <Link
          href='/admin/dashboard'
          className='block text-gray-500 font-semibold hover:text-gray-800'
        >
          Dashboard
        </Link>
        <Link
          href='/admin/dashboard/furniture'
          className='block text-gray-500 font-semibold hover:text-gray-800'
        >
          Furniture
        </Link>
        <Link
          href='/admin/dashboard/orders'
          className='block text-gray-500 font-semibold hover:text-gray-800'
        >
          Orders
        </Link>
        <Link
          href='/admin/dashboard/notifications'
          className='block text-gray-500 font-semibold hover:text-gray-800'
        >
          Notifications
        </Link>
      </nav>

      <button
        onClick={handleLogout}
        className='mt-auto mb-4 text-sm text-red-600 border border-red-200 rounded py-2 hover:bg-red-50 transition'
      >
        Logout
      </button>
    </aside>
  )
}

export default Aside
