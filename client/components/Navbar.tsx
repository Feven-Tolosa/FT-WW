'useclient'
import Link from 'next/link'

export default function Navbar() {
  return (
    <header className='border-b bg-amber-50 fixed w-full top-0 left-0 z-10'>
      <nav className='max-w-7xl mx-auto px-6 py-4 flex items-center justify-between'>
        {/* Logo */}
        <Link
          href='/'
          className='text-2xl font-bold text-[var(--wood)] hover:text-[var(--wood-dark)]'
        >
          TF
        </Link>

        {/* Links */}
        <div className='space-x-6 text-sm font-medium'>
          <Link href='/' className='text-[var(--wood)] hover:underline'>
            Categories
          </Link>
          <Link href='/' className='text-[var(--wood)] hover:underline'>
            Order
          </Link>
          <Link
            href='/admin/login'
            className='bg-[var(--wood)] text-white px-4 py-2 rounded hover:bg-[var(--wood-dark)]'
          >
            Admin
          </Link>
        </div>
      </nav>
    </header>
  )
}
