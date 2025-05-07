// pages/api/customers.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { name, birthdate, email, cardNumber } = req.body
    const customer = await prisma.customer.create({
      data: {
        name,
        birthdate: new Date(birthdate),
        email,
        cardNumber,
      },
    })
    return res.status(201).json(customer)
  }

  if (req.method === "GET") {
    const { cardNumber } = req.query
    const customer = await prisma.customer.findUnique({
      where: { cardNumber: String(cardNumber) },
      include: { purchases: true },
    })
    return res.status(200).json(customer)
  }

  res.setHeader("Allow", ["GET", "POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}
