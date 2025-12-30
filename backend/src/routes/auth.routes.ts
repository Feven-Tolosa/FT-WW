import { prisma } from './../../prisma.config'
import { Router } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = Router()

/* POST /api/auth/login */
router.post('/login', async (req, res) => {
  const { email, password } = req.body

  try {
    const admin = await prisma.admin.findUnique({ where: { email } })
    if (!admin)
      return res.status(401).json({ message: 'Invalid email or password' })

    const isValid = await bcrypt.compare(password, admin.password)
    if (!isValid)
      return res.status(401).json({ message: 'Invalid email or password' })

    const token = jwt.sign(
      { id: admin.id, role: admin.role },
      process.env.JWT_SECRET!,
      {
        expiresIn: '8h',
      }
    )

    res.json({ token, name: admin.name })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
})

export default router
