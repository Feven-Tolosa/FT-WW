export default function AdminDashboard() {
  return (
    <div className='min-h-screen flex bg-gray-100'>
      {/* Sidebar */}
      <aside className='w-64 bg-white border-r p-6'>
        <h2 className='text-xl font-bold text-[var(--wood)] mb-8'>
          Admin Panel
        </h2>

        <nav className='space-y-4 text-sm'>
          <a className='block font-medium text-gray-700 hover:text-[var(--wood)]'>
            Dashboard
          </a>
          <a className='block font-medium text-gray-700 hover:text-[var(--wood)]'>
            Furniture
          </a>
          <a className='block font-medium text-gray-700 hover:text-[var(--wood)]'>
            Orders
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className='flex-1 p-8'>
        <h1 className='text-2xl font-semibold mb-6'>Dashboard Overview</h1>

        {/* Stats */}
        <div className='grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10'>
          <StatCard title='Total Furniture' value='12' />
          <StatCard title='Orders Today' value='4' />
          <StatCard title='Pending Orders' value='3' />
        </div>

        {/* Placeholder Section */}
        <section className='bg-white rounded-lg p-6 shadow'>
          <h2 className='font-semibold mb-4'>Recent Orders</h2>
          <p className='text-gray-600'>
            Orders will appear here once connected to backend.
          </p>
        </section>
      </main>
    </div>
  )
}

function StatCard({ title, value }: { title: string; value: string }) {
  return (
    <div className='bg-white rounded-lg p-6 shadow'>
      <p className='text-sm text-gray-500 mb-1'>{title}</p>
      <p className='text-2xl font-bold'>{value}</p>
    </div>
  )
}
