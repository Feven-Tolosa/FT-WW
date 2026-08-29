'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { clearToken } from '@/lib/api'

function Aside() {
  const router = useRouter()
  const pathname = usePathname()

  const handleLogout = () => {
    clearToken()
    router.push('/admin/login')
  }

  const links = [
    { label: 'Dashboard', href: '/admin/dashboard' },
    { label: 'Furniture', href: '/admin/dashboard/furniture' },
    { label: 'Orders', href: '/admin/dashboard/orders' },
    { label: 'Notifications', href: '/admin/dashboard/notifications' },
  ]

  return (
    <aside className='flex w-64 shrink-0 flex-col border-r border-stone-800 bg-stone-950 p-6'>
      <h2 className='mb-8 text-xl font-light tracking-tight text-white'>
        TF Wood Works
        <span className='block pt-1 text-xs font-normal uppercase tracking-[0.3em] text-wood-400'>
          Admin Panel
        </span>
      </h2>

      <nav className='space-y-1 text-sm'>
        {links.map((link) => {
          const active =
            pathname === link.href ||
            (link.href !== '/admin/dashboard' && pathname.startsWith(link.href))
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`block border-l-2 px-4 py-2.5 transition-colors ${
                active
                  ? 'border-wood-400 bg-stone-900 text-wood-300'
                  : 'border-transparent text-stone-400 hover:border-stone-700 hover:bg-stone-900/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          )
        })}
      </nav>

      <button
        onClick={handleLogout}
        className='mt-auto border border-stone-800 py-2 text-sm text-stone-400 transition-colors hover:border-red-900/60 hover:bg-red-950/40 hover:text-red-400'
      >
        Logout
      </button>
    </aside>
  )
}

export default Aside