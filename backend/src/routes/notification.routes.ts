import { Router } from 'express'
import { prisma } from '../lib/prisma'
import { verifyAdmin } from '../middleware/auth.middleware'

const router = Router()

// GET /api/notifications (admin) — newest first, unread first
router.get('/', verifyAdmin, async (_req, res) => {
  try {
    const notifications = await prisma.notification.findMany({
      include: { order: { include: { furniture: true } } },
      orderBy: [{ isRead: 'asc' }, { createdAt: 'desc' }],
    })
    res.json(notifications)
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// PATCH /api/notifications/:id/read (admin)
router.patch('/:id/read', verifyAdmin, async (req, res) => {
  try {
    const notification = await prisma.notification.update({
      where: { id: Number(req.params.id) },
      data: { isRead: true },
    })
    res.json(notification)
  } catch (err: any) {
    if (err?.code === 'P2025')
      return res.status(404).json({ message: 'Notification not found' })
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

// POST /api/notifications/read-all (admin)
router.post('/read-all', verifyAdmin, async (_req, res) => {
  try {
    await prisma.notification.updateMany({ data: { isRead: true } })
    res.json({ message: 'All notifications marked as read' })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
