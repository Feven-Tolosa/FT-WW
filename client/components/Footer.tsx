'use client'
export default function Footer() {
  return (
    <footer className='bg-gray-50 border-t mt-20 mb-0'>
      <div className='max-w-7xl mx-auto px-6 py-10 text-sm text-gray-600'>
        <div className='flex flex-col md:flex-row justify-between gap-6'>
          <div>
            <h3 className='font-semibold text-gray-900 mb-2'>TF Wood Works</h3>
            <p>Quality handmade furniture built to last.</p>
          </div>

          <div>
            <p>📞 Contact: +251 XXX XXX XXX</p>
            <p>📍 Local craftsmanship, Ethiopia</p>
          </div>
        </div>

        <p className='text-center mt-8 text-xs text-gray-400'>
          © {new Date().getFullYear()} TF. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
