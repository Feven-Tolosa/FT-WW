import 'dotenv/config'
import { defineConfig, env } from 'prisma/config'

export default defineConfig({
  schema: 'prisma/schema.prisma',
  datasource: {
    // CLI (migrations) must use the DIRECT/session connection, not the pooled one.
    url: env('DIRECT_URL'),
  },
  migrations: {
    seed: 'node prisma/seed.cjs',
  },
})
