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
    <div className='min-h-screen flex bg-stone-100'>
      <Aside />

      <main className='flex-1 p-6 md:p-10'>
        <div className='mb-8 flex flex-wrap items-center justify-between gap-4'>
          <div>
            <p className='mb-1 text-xs font-medium uppercase tracking-[0.3em] text-wood-700'>
              Catalog
            </p>
            <h1 className='admin-page-title'>Furniture Management</h1>
          </div>
          <button onClick={openAddModal} className='admin-btn'>
            + Add Furniture
          </button>
        </div>

        {/* Search & Filter */}
        <div className='mb-6 flex flex-wrap gap-3'>
          <input
            type='text'
            placeholder='Search by name or description…'
            value={search}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(1)
            }}
            className='admin-input max-w-xs'
          />
          <select
            value={categoryFilter}
            onChange={(e) => {
              setCategoryFilter(e.target.value)
              setPage(1)
            }}
            className='admin-input w-auto'
          >
            <option value='all'>All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div className='admin-card overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left'>
              <thead>
                <tr>
                  <th className='admin-th'>Name</th>
                  <th className='admin-th'>Category</th>
                  <th className='admin-th'>Price (ETB)</th>
                  <th className='admin-th'>Availability</th>
                  <th className='admin-th text-right'>Actions</th>
                </tr>
              </thead>
              <tbody className='divide-y divide-stone-200'>
                {pageItems.map((item) => (
                  <tr key={item.id} className='hover:bg-stone-50'>
                    <td className='admin-td font-medium'>{item.name}</td>
                    <td className='admin-td'>{item.category?.name ?? '—'}</td>
                    <td className='admin-td'>
                      {Number(item.price).toLocaleString()}
                    </td>
                    <td className='admin-td'>
                      <span
                        className={`inline-block rounded-full px-2.5 py-1 text-xs ${
                          item.available
                            ? 'bg-green-100 text-green-800'
                            : 'bg-stone-200 text-stone-600'
                        }`}
                      >
                        {item.available ? 'Available' : 'Unavailable'}
                      </span>
                    </td>
                    <td className='admin-td text-right'>
                      <div className='inline-flex gap-4'>
                        <button
                          onClick={() => openEditModal(item)}
                          className='text-sm text-wood-700 hover:underline'
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(item.id)}
                          className='text-sm text-red-600 hover:underline'
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filtered.length === 0 && (
            <p className='py-12 text-center text-sm text-stone-500'>
              No furniture found.
            </p>
          )}

          {/* Pagination */}
          {filtered.length > 0 && (
            <div className='flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 p-4 text-sm text-stone-500'>
              <span>
                {(safePage - 1) * PAGE_SIZE + 1}–
                {Math.min(safePage * PAGE_SIZE, filtered.length)} of{' '}
                {filtered.length}
              </span>
              <div className='inline-flex items-center gap-2'>
                <button
                  disabled={safePage <= 1}
                  onClick={() => setPage(safePage - 1)}
                  className='admin-btn-ghost px-3 py-1 disabled:opacity-40'
                >
                  Prev
                </button>
                <span>
                  Page {safePage} of {totalPages}
                </span>
                <button
                  disabled={safePage >= totalPages}
                  onClick={() => setPage(safePage + 1)}
                  className='admin-btn-ghost px-3 py-1 disabled:opacity-40'
                >
                  Next
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {isOpen && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4'>
          <form
            onSubmit={handleSave}
            className='admin-card max-h-[90vh] w-full max-w-md overflow-y-auto p-6'
          >
            <h2 className='mb-1 text-xl font-light tracking-tight text-stone-900'>
              {editingId ? 'Edit Furniture' : 'Add Furniture'}
            </h2>
            <p className='mb-5 text-xs uppercase tracking-[0.3em] text-wood-700'>
              {editingId ? 'Update your catalog item' : 'Create a new catalog item'}
            </p>

            {error && (
              <p className='mb-3 rounded border border-red-200 bg-red-50 p-2 text-sm text-red-600'>
                {error}
              </p>
            )}

            <div className='mb-3'>
              <label className='admin-label'>Furniture Name</label>
              <input
                type='text'
                required
                className='admin-input'
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
              />
            </div>

            <div className='mb-3'>
              <label className='admin-label'>Price (ETB)</label>
              <input
                type='number'
                required
                min={0}
                className='admin-input'
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
              />
            </div>

            <div className='mb-3'>
              <label className='admin-label'>Category</label>
              <select
                className='admin-input'
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
            </div>

            <div className='mb-3'>
              <label className='admin-label'>Image URL</label>
              <input
                type='text'
                placeholder='/images/1.png'
                className='admin-input'
                value={formData.imageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, imageUrl: e.target.value })
                }
              />
            </div>

            <div className='mb-3'>
              <label className='admin-label'>Description</label>
              <textarea
                rows={3}
                className='admin-input'
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
            </div>

            <label className='mb-5 flex items-center gap-2 text-sm text-stone-600'>
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
                className='admin-btn-ghost'
              >
                Cancel
              </button>
              <button type='submit' disabled={saving} className='admin-btn'>
                {saving ? 'Saving…' : editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}