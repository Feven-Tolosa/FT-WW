import Link from 'next/link'
import React from 'react'

function Aside() {
  return (
    <aside className='w-64 bg-white border-r p-6 pt-25'>
      <h2 className='text-xl font-bold text-[var(--wood)] mb-8 '>
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
          href='#'
          className='block text-gray-500 font-semibold hover:text-gray-800'
        >
          Orders
        </Link>
      </nav>
    </aside>
  )
}

export default Aside
