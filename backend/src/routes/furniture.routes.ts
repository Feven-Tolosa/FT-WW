import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { verifyAdmin } from '../middleware/auth.middleware'

const router = Router()

/* ---------- Public ---------- */

// GET /api/furniture?category=Chairs
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const items = await prisma.furniture.findMany({
      where: category ? { category: { name: String(category) } } : undefined,
      include: { category: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(items)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// GET /api/furniture/:id
router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.furniture.findUnique({
      where: { id: Number(req.params.id) },
      include: { category: true },
    })
    if (!item)
      return res.status(404).json({ message: 'Furniture not found' })
    res.json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

/* ---------- Admin (protected) ---------- */

// POST /api/furniture
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, availability, categoryId } = req.body

    if (!name || price == null)
      return res.status(400).json({ message: 'name and price are required' })

    const item = await prisma.furniture.create({
      data: {
        name,
        description: description ?? '',
        price: Number(price),
        imageUrl: imageUrl ?? null,
        available:
          availability !== undefined ? Boolean(availability) : true,
        adminId: req.admin!.id,
        categoryId:
          categoryId != null && categoryId !== '' ? Number(categoryId) : null,
      },
      include: { category: true },
    })
    res.status(201).json(item)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// PUT /api/furniture/:id
router.put('/:id', verifyAdmin, async (req, res) => {
  try {
    const { name, description, price, imageUrl, availability, categoryId } = req.body

    const item = await prisma.furniture.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(name !== undefined && { name }),
        ...(description !== undefined && { description }),
        ...(price !== undefined && { price: Number(price) }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(availability !== undefined && {
          available: Boolean(availability),
        }),
        ...(categoryId !== undefined && {
          categoryId:
            categoryId != null && categoryId !== '' ? Number(categoryId) : null,
        }),
      },
      include: { category: true },
    })
    res.json(item)
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ message: 'Furniture not found' })
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// DELETE /api/furniture/:id
router.delete('/:id', verifyAdmin, async (req, res) => {
  try {
    await prisma.furniture.delete({
      where: { id: Number(req.params.id) },
    })
    res.json({ message: 'Furniture deleted' })
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ message: 'Furniture not found' })
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
