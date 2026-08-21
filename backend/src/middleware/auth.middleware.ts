import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

export interface AdminPayload {
  id: number
  role: string
}

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      admin?: AdminPayload
    }
  }
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
  const header = req.headers.authorization

  if (!header || !header.startsWith('Bearer '))
    return res.status(401).json({ message: 'Unauthorized: token missing' })

  try {
    const payload = jwt.verify(
      header.split(' ')[1],
      process.env.JWT_SECRET!
    ) as AdminPayload

    req.admin = payload
    next()
  } catch {
    return res
      .status(401)
      .json({ message: 'Unauthorized: invalid or expired token' })
  }
}
