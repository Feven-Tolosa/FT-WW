import type { Metadata } from 'next'
import CollectionsView from '@/components/CollectionsView'
import { furnitures } from '@/data/furnitures'

export const metadata: Metadata = {
  title: 'Collections | TF Wood Works',
  description:
    'Browse the full range of handcrafted solid-wood furniture — chairs, tables, sofas, dining sets and more.',
}

export default function CollectionsPage() {
  return <CollectionsView items={furnitures} />
}
