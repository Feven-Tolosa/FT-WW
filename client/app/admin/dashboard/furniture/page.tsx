'use client'

import Aside from '@/components/Aside'
import Image from 'next/image'
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

  const [isOpen, setIsOpen] = useState(false)
  const [editingItem, setEditingItem] = useState<Furniture | null>(null)

  const [formData, setFormData] = useState({
    name: '',
    price: '',
  })

  const openAddModal = () => {
    setEditingItem(null)
    setFormData({ name: '', price: '' })
    setIsOpen(true)
  }

  const openEditModal = (item: Furniture) => {
    setEditingItem(item)
    setFormData({
      name: item.name,
      price: item.price.toString(),
    })
    setIsOpen(true)
  }

  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <div className='flex-1 p-8 mt-13'>
        <div className='flex flex-1 justify-between items-center  mb-6'>
          <h1 className='text-2xl px-3 font-semibold text-gray-800'>
            Furniture Management
          </h1>
          <button
            onClick={openAddModal}
            className='bg-[var(--wood)] text-white px-4 py-2 rounded hover:bg-[var(--wood-dark)]'
          >
            + Add Furniture
          </button>
        </div>

        {/* Table */}
        <div className='bg-white rounded-lg shadow overflow-hidden mb-100'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 text-gray-600 text-left'>
              <tr>
                <th className='p-3'>Name</th>
                <th className='p-3'>Price (ETB)</th>
                <th className='p-3 text-right'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {furniture.map((item) => (
                <tr key={item.id} className='border-t text-gray-500'>
                  <td className='p-3'>{item.name}</td>
                  <td className='p-3'>{item.price}</td>
                  <td className='p-3 text-right space-x-3'>
                    <button
                      onClick={() => openEditModal(item)}
                      className='text-blue-600 hover:underline'
                    >
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

          {isOpen && (
            <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
              <div className='bg-white rounded-lg w-full max-w-md p-6'>
                <h2 className='text-xl font-semibold text-gray-500 mb-4'>
                  {editingItem ? 'Edit Furniture' : 'Add Furniture'}
                </h2>

                {/* Name */}
                <input
                  type='text'
                  placeholder='Furniture Name'
                  className='w-full border p-2 text-gray-400 rounded mb-3'
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />

                {/* Price */}
                <input
                  type='number'
                  placeholder='Price (ETB)'
                  className='w-full border p-2 text-gray-400 rounded mb-4'
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />

                {/* Image placeholder */}
                <div className='border border-dashed rounded p-4 text-center text-sm text-gray-500 mb-4'>
                  <Image
                    src='/images/1.png'
                    alt='Furniture Image'
                    width={100}
                    height={100}
                  />
                </div>

                {/* Actions */}
                <div className='flex justify-end gap-3'>
                  <button
                    onClick={closeModal}
                    className='px-4 py-2 rounded text-gray-400 border'
                  >
                    Cancel
                  </button>
                  <button className='px-4 py-2 rounded bg-[var(--wood)] text-white hover:bg-[var(--wood-dark)]'>
                    {editingItem ? 'Update' : 'Add'}
                  </button>
                </div>
              </div>
            </div>
          )}

          {furniture.length === 0 && (
            <p className='p-4 text-gray-500 text-center'>
              No furniture added yet.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}
