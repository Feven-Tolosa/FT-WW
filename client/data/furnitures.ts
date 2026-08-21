export interface Furniture {
  id: string
  name: string
  price: number
  category: string
  image: string
  description: string
}

export const furnitures: Furniture[] = [
  {
    id: '1',
    name: 'Oak Wood Chair',
    price: 4500,
    category: 'chairs',
    image: '/images/1.png',
    description: 'Handcrafted oak chair with modern comfort.',
  },
  {
    id: '2',
    name: 'Walnut Dining Chair',
    price: 5200,
    category: 'chairs',
    image: '/images/2.png',
    description: 'Elegant walnut chair for dining spaces.',
  },
  {
    id: '3',
    name: 'Sculpted Armchair',
    price: 7400,
    category: 'chairs',
    image: '/images/3.png',
    description: 'A statement armchair with sculpted solid-wood frame.',
  },
  {
    id: '4',
    name: 'Minimal Coffee Table',
    price: 9800,
    category: 'tables',
    image: '/images/4.png',
    description: 'Solid wood coffee table with clean lines.',
  },
  {
    id: '5',
    name: 'Solid Oak Dining Table',
    price: 18500,
    category: 'tables',
    image: '/images/2.png',
    description: 'Seats six comfortably. Built from a single oak slab.',
  },
  {
    id: '6',
    name: 'Walnut Side Table',
    price: 6200,
    category: 'tables',
    image: '/images/1.png',
    description: 'Compact side table with a rich walnut finish.',
  },
  {
    id: '7',
    name: 'Linen Comfort Sofa',
    price: 32000,
    category: 'sofas',
    image: '/images/3.png',
    description: 'Three-seat sofa with hardwood frame and linen upholstery.',
  },
  {
    id: '8',
    name: '6-Seater Dining Set',
    price: 42000,
    category: 'dining',
    image: '/images/2.png',
    description: 'Dining table with six matching handcrafted chairs.',
  },
  {
    id: '9',
    name: 'Solid Wood Bed Frame',
    price: 28000,
    category: 'beds',
    image: '/images/4.png',
    description: 'Queen-size platform bed in warm-toned solid wood.',
  },
  {
    id: '10',
    name: 'Kitchen Island Counter',
    price: 24000,
    category: 'kitchen',
    image: '/images/1.png',
    description: 'Butcher-block island with storage and seating ledge.',
  },
  {
    id: '11',
    name: 'Teak Lounge Chair',
    price: 8900,
    category: 'chairs',
    image: '/images/4.png',
    description: 'Relaxed lounge chair finished in natural teak oil.',
  },
  {
    id: '12',
    name: 'Entryway Console Table',
    price: 11500,
    category: 'tables',
    image: '/images/3.png',
    description: 'Slim console with dovetail drawers for the hallway.',
  },
]
