import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { verifyAdmin } from '../middleware/auth.middleware'

const router = Router()

/* ---------- Public ---------- */

// GET /api/categories
router.get('/', async (_req, res) => {
  try {
    const categories = await prisma.category.findMany({
      include: { _count: { select: { furniture: true } } },
      orderBy: { name: 'asc' },
    })
    res.json(categories)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

/* ---------- Admin (protected) ---------- */

// POST /api/categories
router.post('/', verifyAdmin, async (req, res) => {
  try {
    const { name } = req.body
    if (!name)
      return res.status(400).json({ message: 'name is required' })

    const category = await prisma.category.create({ data: { name } })
    res.status(201).json(category)
  } catch (err: any) {
    if (err?.code === 'P2002')
      return res.status(409).json({ message: 'Category already exists' })
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
