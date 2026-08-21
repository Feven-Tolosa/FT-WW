'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getToken } from '@/lib/api'

export default function AdminIndexPage() {
  const [token, setToken] = useState<string | null | undefined>(undefined)

  useEffect(() => {
    setToken(getToken())
  }, [])

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <div className='bg-white rounded-lg shadow-md w-full max-w-sm p-10 text-center'>
        <h1 className='text-2xl font-semibold text-gray-800 mb-2'>
          Admin Panel
        </h1>
        <p className='text-sm text-gray-500 mb-8'>
          {token
            ? 'You are signed in. Continue to your dashboard.'
            : 'Sign in to manage furniture, orders and notifications.'}
        </p>

        {token === undefined ? (
          <p className='text-sm text-gray-400'>Checking session…</p>
        ) : token ? (
          <Link
            href='/admin/dashboard'
            className='inline-flex w-full items-center justify-center gap-2 bg-[var(--wood)] text-white py-2.5 rounded hover:bg-[var(--wood-dark)] transition'
          >
            Go to Dashboard
            <ArrowRight size={16} />
          </Link>
        ) : (
          <Link
            href='/admin/login'
            className='inline-flex w-full items-center justify-center gap-2 bg-[var(--wood)] text-white py-2.5 rounded hover:bg-[var(--wood-dark)] transition'
          >
            Admin Login
            <ArrowRight size={16} />
          </Link>
        )}
      </div>
    </div>
  )
}
