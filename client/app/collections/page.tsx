import type { Metadata } from 'next'
import CollectionsView from '@/components/CollectionsView'
import { furnitures } from '@/data/furnitures'

export const metadata: Metadata = {
  title: 'Collections | TF Wood Works',
  description:
    'Browse the full range of handcrafted solid-wood furniture — chairs, tables, sofas, dining sets and more.',
}

type ApiFurniture = {
  id: number
  name: string
  description: string
  price: string | number
  imageUrl?: string | null
  category?: { name: string } | null
}

export default async function CollectionsPage() {
  let items = furnitures

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:5000/api'}/furniture`,
      { cache: 'no-store' }
    )
    if (res.ok) {
      const data: ApiFurniture[] = await res.json()
      if (data.length > 0) {
        items = data.map((item) => ({
          id: String(item.id),
          name: item.name,
          price: Number(item.price),
          category: item.category?.name?.toLowerCase() ?? 'other',
          image: item.imageUrl || '/images/1.png',
          description: item.description,
        }))
      }
    }
  } catch {
    // Backend offline → keep bundled sample data
  }

  return <CollectionsView items={items} />
}
