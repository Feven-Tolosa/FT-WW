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

/* ---------- Routes (will be added later) ---------- */
// app.use("/api/auth", authRoutes);
// app.use("/api/furniture", furnitureRoutes);
// app.use("/api/orders", orderRoutes);

/* ---------- 404 Handler ---------- */
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' })
})

export default app
