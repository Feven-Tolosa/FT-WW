'use client'

import { useState } from 'react'

type Furniture = {
  id: number
  name: string
  price: number
}

export default function FurniturePage() {
  const [furniture, setFurniture] = useState<Furniture[]>([
    { id: 1, name: 'Wooden Chair', price: 3500 },
    { id: 2, name: 'Dining Table', price: 12000 },
    { id: 3, name: 'Bed Frame', price: 18000 },
  ])

  return (
    <div>
      {/* Header */}
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-2xl font-semibold'>Furniture Management</h1>
        <button className='bg-[var(--wood)] text-white px-4 py-2 rounded hover:bg-[var(--wood-dark)]'>
          + Add Furniture
        </button>
      </div>

      {/* Table */}
      <div className='bg-white rounded-lg shadow overflow-hidden'>
        <table className='w-full text-sm'>
          <thead className='bg-gray-100 text-left'>
            <tr>
              <th className='p-3'>Name</th>
              <th className='p-3'>Price (ETB)</th>
              <th className='p-3 text-right'>Actions</th>
            </tr>
          </thead>

          <tbody>
            {furniture.map((item) => (
              <tr key={item.id} className='border-t'>
                <td className='p-3'>{item.name}</td>
                <td className='p-3'>{item.price}</td>
                <td className='p-3 text-right space-x-3'>
                  <button className='text-blue-600 hover:underline'>
                    Edit
                  </button>
                  <button className='text-red-600 hover:underline'>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {furniture.length === 0 && (
          <p className='p-4 text-gray-500 text-center'>
            No furniture added yet.
          </p>
        )}
      </div>
    </div>
  )
}
