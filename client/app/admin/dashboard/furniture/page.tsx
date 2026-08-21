'use client'

import { useCallback, useEffect, useState } from 'react'
import Aside from '@/components/Aside'
import { api, getToken, clearToken } from '@/lib/api'
import { useRouter } from 'next/navigation'

type Furniture = {
  id: number
  name: string
  description: string
  price: string | number
  imageUrl?: string | null
  available?: boolean
  categoryId?: number | null
  category?: { id: number; name: string } | null
}

type Category = { id: number; name: string }

const emptyForm = {
  name: '',
  price: '',
  description: '',
  imageUrl: '',
  categoryId: '',
  available: true,
}

const PAGE_SIZE = 6

export default function FurniturePage() {
  const router = useRouter()
  const [items, setItems] = useState<Furniture[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  // Search / filter / pagination
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [page, setPage] = useState(1)

  useEffect(() => {
    if (!getToken()) {
      clearToken()
      router.push('/admin/login')
    }
  }, [router])

  const load = useCallback(() => {
    api<Furniture[]>('/furniture').then(setItems).catch(console.error)
    api<Category[]>('/categories').then(setCategories).catch(console.error)
  }, [])

  useEffect(load, [load])

  const filtered = items.filter((item) => {
    const matchesSearch =
      search.trim() === '' ||
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.description ?? '').toLowerCase().includes(search.toLowerCase())
    const matchesCategory =
      categoryFilter === 'all' ||
      String(item.categoryId) === categoryFilter
    return matchesSearch && matchesCategory
  })

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, totalPages)
  const pageItems = filtered.slice(
    (safePage - 1) * PAGE_SIZE,
    safePage * PAGE_SIZE
  )

  const guard = () => {
    if (!getToken()) {
      clearToken()
      router.push('/admin/login')
      return false
    }
    return true
  }

  const openAddModal = () => {
    setEditingId(null)
    setFormData(emptyForm)
    setError('')
    setIsOpen(true)
  }

  const openEditModal = (item: Furniture) => {
    setEditingId(item.id)
    setFormData({
      name: item.name,
      price: String(item.price),
      description: item.description ?? '',
      imageUrl: item.imageUrl ?? '',
      categoryId: item.categoryId ? String(item.categoryId) : '',
      available: item.available ?? true,
    })
    setError('')
    setIsOpen(true)
  }

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guard()) return
    setSaving(true)
    setError('')

    try {
      const body = JSON.stringify({
        name: formData.name,
        price: Number(formData.price),
        description: formData.description,
        imageUrl: formData.imageUrl || undefined,
        categoryId: formData.categoryId || undefined,
        availability: formData.available,
      })

      if (editingId) {
        await api<Furniture>(`/furniture/${editingId}`, {
          method: 'PUT',
          body,
        })
      } else {
        await api<Furniture>('/furniture', { method: 'POST', body })
      }
      setIsOpen(false)
      load()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Save failed')
    } finally {
      setSaving(false)
    }
  }

  const handleDelete = async (id: number) => {
    if (!guard()) return
    if (!confirm('Delete this furniture item?')) return

    try {
      await api(`/furniture/${id}`, { method: 'DELETE' })
      setItems((prev) => prev.filter((i) => i.id !== id))
    } catch (err) {
      alert(err instanceof Error ? err.message : 'Delete failed')
    }
  }

  return (
    <div className='min-h-screen flex bg-gray-100'>
      <Aside />

      <div className='flex-1 p-8 mt-13'>
        <div className='flex flex-1 justify-between items-center mb-6'>
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

        {/* Search & Filter */}
        <div className='px-3 mb-4 flex gap-3'>
          <input
            type='text'
            placeholder='Search by name or description…'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className='flex-1 max-w-xs border rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-gray-800'
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setPage(1)
            }}
            className='border rounded p-2 text-sm text-gray-700 focus:outline-none focus:border-gray-800'
          >
            <option value='all'>All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className='bg-white rounded-lg shadow overflow-hidden mb-100 mx-3'>
          <table className='w-full text-sm'>
            <thead className='bg-gray-100 text-gray-600 text-left'>
              <tr>
                <th className='p-3'>Name</th>
                <th className='p-3'>Category</th>
                <th className='p-3'>Price (ETB)</th>
                <th className='p-3'>Availability</th>
                <th className='p-3 text-right'>Actions</th>
              </tr>
            </thead>

            <tbody>
              {pageItems.map((item) => (
                <tr key={item.id} className='border-t text-gray-500'>
                  <td className='p-3'>{item.name}</td>
                  <td className='p-3'>{item.category?.name ?? '—'}</td>
                  <td className='p-3'>
                    {Number(item.price).toLocaleString()}
                  </td>
                  <td className='p-3'>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        item.available
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-200 text-gray-600'
                      }`}
                    >
                      {item.available ? 'Available' : 'Unavailable'}
                    </span>
                  </td>
                  <td className='p-3 text-right space-x-3'>
                    <button
                      onClick={() => openEditModal(item)}
                      className='text-blue-600 hover:underline'
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className='text-red-600 hover:underline'
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filtered.length === 0 && (
            <p className='p-4 text-gray-500 text-center'>
              No furniture found.
            </p>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className='flex justify-between items-center p-3 border-t text-sm text-gray-500'>
              <span>
                {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length}
              </span>
              <div className='space-x-2'>
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50'
                >
                  Prev
                </button>
                <span>
                  Page {safePage} of {totalPages}
                </span>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className='px-3 py-1 border rounded disabled:opacity-40 hover:bg-gray-50'
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {isOpen && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center z-50'>
          <form
            onSubmit={handleSave}
            className='bg-white rounded-lg w-full max-w-md p-6 max-h-[90vh] overflow-y-auto'
          >
            <h2 className='text-xl font-semibold text-gray-500 mb-4'>
              {editingId ? 'Edit Furniture' : 'Add Furniture'}
            </h2>

            {error && (
              <p className='mb-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2'>
                {error}
              </p>
            )}

            <input
              type='text'
              required
              placeholder='Furniture Name'
              className='w-full border p-2 text-gray-700 rounded mb-3'
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />

            <input
              type='number'
              required
              min={0}
              placeholder='Price (ETB)'
              className='w-full border p-2 text-gray-700 rounded mb-3'
              value={formData.price}
              onChange={(e) =>
                setFormData({ ...formData, price: e.target.value })
              }
            />

            <select
              className='w-full border p-2 text-gray-700 rounded mb-3'
              value={formData.categoryId}
              onChange={(e) =>
                setFormData({ ...formData, categoryId: e.target.value })
              }
            >
              <option value=''>No category</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>

            <input
              type='text'
              placeholder='Image URL (/images/1.png)'
              className='w-full border p-2 text-gray-700 rounded mb-3'
              value={formData.imageUrl}
              onChange={(e) =>
                setFormData({ ...formData, imageUrl: e.target.value })
              }
            />

            <textarea
              placeholder='Description'
              rows={3}
              className='w-full border p-2 text-gray-700 rounded mb-3'
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
            />

            <label className='flex items-center gap-2 text-sm text-gray-600 mb-4'>
              <input
                type='checkbox'
                checked={formData.available}
                onChange={(e) =>
                  setFormData({ ...formData, available: e.target.checked })
                }
              />
              Available for ordering
            </label>

            <div className='flex justify-end gap-3'>
              <button
                type='button'
                onClick={() => setIsOpen(false)}
                className='px-4 py-2 rounded text-gray-400 border'
              >
                Cancel
              </button>
              <button
                type='submit'
                disabled={saving}
                className='px-4 py-2 rounded bg-[var(--wood)] text-white hover:bg-[var(--wood-dark)] disabled:opacity-50'
              >
                {saving ? 'Saving…' : editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}
