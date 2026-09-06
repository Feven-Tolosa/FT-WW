// Resets the admin password to the value in backend/.env (ADMIN_EMAIL /
// ADMIN_PASSWORD), so the DB hash always matches what's in your env file.
//
//   node scripts/reset-admin-password.cjs
//
// Runs from backend/. Requires ADMIN_EMAIL and ADMIN_PASSWORD set in .env.

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
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD

  if (!email || !password) {
    console.error(
      'Set ADMIN_EMAIL and ADMIN_PASSWORD in backend/.env first.'
    )
    process.exit(1)
  }

  const hashed = await bcrypt.hash(password, 10)
  const admin = await prisma.admin.upsert({
    where: { email },
    update: { password: hashed, role: 'ADMIN' },
    create: {
      email,
      name: 'TF Wood Works Admin',
      phone: '+251900000000',
      password: hashed,
      role: 'ADMIN',
    },
  })

  console.log(`Admin password reset for: ${admin.email}`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())