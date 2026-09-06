const { PrismaClient } = require('@prisma/client')
const { PrismaPg } = require('@prisma/adapter-pg')
const bcrypt = require('bcrypt')

require('dotenv').config()

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL,
  max: 1,
})

const prisma = new PrismaClient({ adapter })

async function main() {
  const admins = [
    {
      email: process.env.ADMIN_EMAIL ?? 'tofewoodworks@gmail.com',
      name: 'TF Wood Works Admin',
      phone: '+251900000000',
    },
  ]

  let firstAdminId
  for (const a of admins) {
    const password = await bcrypt.hash(
      process.env.ADMIN_PASSWORD ?? 'tofewood@1works',
      10
    )
    const admin = await prisma.admin.upsert({
      where: { email: a.email },
      // Password is always resynced from the env on every seed.
      update: { name: a.name, phone: a.phone, password },
      create: { ...a, password, role: 'ADMIN' },
    })
    if (!firstAdminId) firstAdminId = admin.id
    console.log(`Admin seeded: ${a.email} (${a.name})`)
  }

  const categories = ['Chairs', 'Tables', 'Sofas', 'Dining', 'Beds', 'Kitchen']
  const categoryMap = {}
  for (const name of categories) {
    const cat = await prisma.category.upsert({
      where: { name },
      update: {},
      create: { name },
    })
    categoryMap[name] = cat.id
  }
  console.log('Categories seeded:', categories.join(', '))

  const catSlugToName = {
    chairs: 'Chairs',
    tables: 'Tables',
    sofas: 'Sofas',
    dining: 'Dining',
    beds: 'Beds',
    kitchen: 'Kitchen',
  }

  const furnitureItems = [
    // Original showcase collection
    { name: 'Oak Wood Chair', price: 4500, category: 'chairs', image: '/images/1.png', description: 'Handcrafted oak chair with modern comfort.' },
    { name: 'Walnut Dining Chair', price: 5200, category: 'chairs', image: '/images/2.png', description: 'Elegant walnut chair for dining spaces.' },
    { name: 'Sculpted Armchair', price: 7400, category: 'chairs', image: '/images/3.png', description: 'A statement armchair with sculpted solid-wood frame.' },
    { name: 'Minimal Coffee Table', price: 9800, category: 'tables', image: '/images/4.png', description: 'Solid wood coffee table with clean lines.' },
    { name: 'Solid Oak Dining Table', price: 18500, category: 'tables', image: '/images/2.png', description: 'Seats six comfortably. Built from a single oak slab.' },
    { name: 'Walnut Side Table', price: 6200, category: 'tables', image: '/images/1.png', description: 'Compact side table with a rich walnut finish.' },
    { name: 'Linen Comfort Sofa', price: 32000, category: 'sofas', image: '/images/3.png', description: 'Three-seat sofa with hardwood frame and linen upholstery.' },
    { name: '6-Seater Dining Set', price: 42000, category: 'dining', image: '/images/2.png', description: 'Dining table with six matching handcrafted chairs.' },
    { name: 'Solid Wood Bed Frame', price: 28000, category: 'beds', image: '/images/4.png', description: 'Queen-size platform bed in warm-toned solid wood.' },
    { name: 'Kitchen Island Counter', price: 24000, category: 'kitchen', image: '/images/1.png', description: 'Butcher-block island with storage and seating ledge.' },
    { name: 'Teak Lounge Chair', price: 8900, category: 'chairs', image: '/images/4.png', description: 'Relaxed lounge chair finished in natural teak oil.' },
    { name: 'Entryway Console Table', price: 11500, category: 'tables', image: '/images/3.png', description: 'Slim console with dovetail drawers for the hallway.' },
    // Generated additions
    { name: 'Leather Accent Chair', price: 12500, category: 'chairs', image: '/images/2.png', description: 'Top-grain leather seat on a hand-rubbed wooden frame.' },
    { name: 'Rocking Chair', price: 9500, category: 'chairs', image: '/images/3.png', description: 'Classic curved-rockers chair smoothed for quiet evenings.' },
    { name: 'Round Coffee Table', price: 7800, category: 'tables', image: '/images/1.png', description: 'Circular solid-top table with tapered legs.' },
    { name: 'TV Stand Console', price: 13500, category: 'tables', image: '/images/4.png', description: 'Low-profile media console with cable management cutouts.' },
    { name: 'Two-Seater Loveseat', price: 26500, category: 'sofas', image: '/images/1.png', description: 'Compact loveseat upholstered in woven cotton blend.' },
    { name: 'Extendable Dining Table', price: 38500, category: 'dining', image: '/images/3.png', description: 'Seats four, extends to eight with a hidden butterfly leaf.' },
    { name: 'King Size Bed Frame', price: 36000, category: 'beds', image: '/images/2.png', description: 'King-size platform bed with headboard shelving.' },
    { name: 'Kitchen Cabinet', price: 19500, category: 'kitchen', image: '/images/4.png', description: 'Freestanding pantry cabinet with adjustable shelves.' },
    { name: 'Bar Stool Set of Two', price: 8500, category: 'kitchen', image: '/images/1.png', description: 'Counter-height stools with footrest and oiled finish.' },
  ]

  let created = 0
  for (const item of furnitureItems) {
    const exists = await prisma.furniture.findFirst({
      where: { name: item.name },
    })
    if (exists) continue

    await prisma.furniture.create({
      data: {
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.image,
        available: true,
        adminId: firstAdminId,
        categoryId: categoryMap[catSlugToName[item.category]],
      },
    })
    created++
  }
  console.log(`Furniture seeded: ${created} new (${furnitureItems.length} total in catalog)`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
