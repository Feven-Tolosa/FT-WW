import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config()

const app = express()

/* ---------- Middlewares ---------- */
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

/* ---------- Health Check ---------- */
app.get('/', (req, res) => {
  res.json({
    message: 'Furniture Platform API is running 🚀',
  })
})

// GET /api — endpoint index
app.get('/api', (_req, res) => {
  res.json({
    message: 'TF Wood Works API',
    endpoints: {
      auth: 'POST /api/auth/login',
      categories: 'GET /api/categories',
      furniture: 'GET|POST /api/furniture, PUT|DELETE /api/furniture/:id',
      orders: 'POST /api/orders (public), GET /api/orders (admin)',
      notifications: 'GET /api/notifications (admin)',
      upload: 'POST /api/upload (admin, multipart "image")',
    },
  })
})

/* ---------- Routes ---------- */
import authRoutes from './routes/auth.routes'
import categoryRoutes from './routes/category.routes'
import furnitureRoutes from './routes/furniture.routes'
import orderRoutes from './routes/order.routes'
import notificationRoutes from './routes/notification.routes'
import uploadRoutes from './routes/upload.routes'

app.use('/api/auth', authRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/furniture', furnitureRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/notifications', notificationRoutes)
app.use('/api/upload', uploadRoutes)

/* ---------- 404 Handler ---------- */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
