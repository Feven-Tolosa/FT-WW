'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { api, setToken, getToken } from '@/lib/api'

export default function AdminLogin() {
  const router = useRouter()

  // Already signed in? Go straight to the dashboard
  useEffect(() => {
    if (getToken()) router.replace('/admin/dashboard')
  }, [router])

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const data = await api<{ token: string; name: string }>(
        '/auth/login',
        {
          method: 'POST',
          body: JSON.stringify({ email, password }),
        }
      )
      setToken(data.token)
      router.push('/admin/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
      setLoading(false)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100 px-4'>
      <form
        onSubmit={handleSubmit}
        className='bg-white rounded-lg shadow-md w-full max-w-sm p-8'
      >
        <h1 className='text-2xl font-semibold text-gray-800 mb-1'>
          Admin Login
        </h1>
        <p className='text-sm text-gray-500 mb-6'>
          Sign in to manage furniture and orders.
        </p>

        {error && (
          <p className='mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2'>
            {error}
          </p>
        )}

        <label className='block text-sm text-gray-600 mb-1'>Email</label>
        <input
          type='email'
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder='admin@example.com'
          className='w-full border border-gray-300 rounded p-2 mb-4 text-gray-700 focus:outline-none focus:border-gray-800'
        />

        <label className='block text-sm text-gray-600 mb-1'>Password</label>
        <input
          type='password'
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder='••••••••'
          className='w-full border border-gray-300 rounded p-2 mb-6 text-gray-700 focus:outline-none focus:border-gray-800'
        />

        <button
          type='submit'
          disabled={loading}
          className='w-full bg-[var(--wood)] text-white py-2.5 rounded hover:bg-[var(--wood-dark)] disabled:opacity-50 transition'
        >
          {loading ? 'Signing in…' : 'Sign In'}
        </button>
      </form>
    </div>
  )
}
