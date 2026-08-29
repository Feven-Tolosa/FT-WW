import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { verifyAdmin } from '../middleware/auth.middleware'

const router = Router()
const VALID_STATUSES = ['PENDING', 'COMPLETED', 'CANCELLED'] as const

/* ---------- Public ---------- */

// GET /api/orders/lookup?phone=... — public order history lookup by phone
router.get('/lookup', async (req, res) => {
  try {
    const phone = String(req.query.phone || '').trim()
    if (!phone)
      return res
        .status(400)
        .json({ message: 'phone query parameter is required' })

    const orders = await prisma.order.findMany({
      where: { customerPhone: phone },
      include: { furniture: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/orders — clients order with just name + phone
router.post('/', async (req, res) => {
  try {
    const { customerName, customerPhone, furnitureId, quantity } = req.body

    if (!customerName || !customerPhone || furnitureId == null)
      return res.status(400).json({
        message: 'customerName, customerPhone and furnitureId are required',
      })

    const qty = Math.max(
      1,
      Math.min(Number(quantity) || 1, 100),
    )

    const furniture = await prisma.furniture.findUnique({
      where: { id: Number(furnitureId) },
    })
    if (!furniture)
      return res.status(404).json({ message: 'Furniture not found' })

    const order = await prisma.order.create({
      data: {
        customerName,
        customerPhone,
        furnitureId: Number(furnitureId),
      },
      include: { furniture: true },
    })

    // Notify admins about the new order
    await prisma.notification.create({
      data: {
        orderId: order.id,
        message: `New order #${order.id}: ${furniture.name} ×${qty} by ${customerName} (${customerPhone})`,
      },
    })

    res.status(201).json({ ...order, quantity: qty })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

/* ---------- Admin (protected) ---------- */

// GET /api/orders?status=PENDING
router.get('/', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.query
    const orders = await prisma.order.findMany({
      where:
        status && VALID_STATUSES.includes(String(status) as any)
          ? { status: String(status) as any }
          : undefined,
      include: { furniture: true },
      orderBy: { createdAt: 'desc' },
    })
    res.json(orders)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/orders/:id/status
router.patch('/:id/status', verifyAdmin, async (req, res) => {
  try {
    const { status } = req.body
    if (!status || !VALID_STATUSES.includes(status))
      return res
        .status(400)
        .json({ message: `status must be one of: ${VALID_STATUSES.join(', ')}` })

    const order = await prisma.order.update({
      where: { id: Number(req.params.id) },
      data: { status },
      include: { furniture: true },
    })
    res.json(order)
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ message: 'Order not found' })
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
