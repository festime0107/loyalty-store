/* pages/api/purchases.ts */
import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/lib/prisma'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST'])
    return res.status(405).end(`Method ${req.method} Not Allowed`)
  }

  const { cardNumber, products } = req.body as { cardNumber: string; products: string[] }
  const customer = await prisma.customer.findUnique({ where: { cardNumber } })
  if (!customer) return res.status(404).json({ error: 'Klient jo i gjetur' })

  // Create a purchase record for each product
  const purchasesData = products.map((product: string) => ({ customerId: customer.id, product }))
  await prisma.purchase.createMany({ data: purchasesData })

  // Count total purchases
  const total = await prisma.purchase.count({ where: { customerId: customer.id } })
  const discount = total % 5 === 0 ? 0.5 : 0

  return res.status(201).json({ total, discount })
}