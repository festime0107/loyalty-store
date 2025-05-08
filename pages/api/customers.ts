import type { NextApiRequest, NextApiResponse } from 'next'
import type { Customer } from '@prisma/client'
import prisma from '@/lib/prisma'    // <-- default import

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Customer[] | { message: string }>
) {
  try {
    if (req.method === 'GET') {
      const customers = await prisma.customer.findMany()
      return res.status(200).json(customers)
    }
    res.setHeader('Allow', ['GET'])
    return res.status(405).json({ message: `Method ${req.method} Not Allowed` })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}
