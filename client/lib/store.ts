import { furnitures, type Furniture } from '@/data/furnitures'
import { api } from '@/lib/api'

export type { Furniture }

type ApiFurniture = {
  id: number
  name: string
  description: string
  price: string | number
  imageUrl?: string | null
  category?: { name: string } | null
}

export async function getFurniture(): Promise<Furniture[]> {
  try {
    const data = await api<ApiFurniture[]>('/furniture')
    if (data.length > 0) {
      return data.map((item) => ({
        id: String(item.id),
        name: item.name,
        price: Number(item.price),
        category: item.category?.name?.toLowerCase() ?? 'other',
        image: item.imageUrl || '/images/1.png',
        description: item.description,
      }))
    }
  } catch {
    // Backend offline → fall back to bundled sample data
  }
  return furnitures
}

export const categoryFilters = [
  { label: 'All', value: 'all' },
  { label: 'Chairs', value: 'chairs' },
  { label: 'Tables', value: 'tables' },
  { label: 'Sofas', value: 'sofas' },
  { label: 'Dining', value: 'dining' },
  { label: 'Beds', value: 'beds' },
  { label: 'Kitchen', value: 'kitchen' },
]

export function formatPrice(price: number): string {
  return `ETB ${price.toLocaleString()}`
}
