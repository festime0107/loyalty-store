// pages/api/customers.ts
import type { NextApiRequest, NextApiResponse } from "next"
import { prisma } from "@/lib/prisma"
import { Prisma } from "@prisma/client"


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    try {
      const { name, birthdate, email, cardNumber } = req.body
      const customer = await prisma.customer.create({
        data: { name, birthdate: new Date(birthdate), email, cardNumber },
      })
      return res.status(201).json(customer)
    }catch (err: any) {
        if (err instanceof Prisma.PrismaClientKnownRequestError && err.code === "P2002") {
          return res.status(409).json({ error: "Ky Card Number ose Email ekziston më parë." })
        }
        return res.status(500).json({ error: "Gabim serveri." })
      }
  }

  if (req.method === "GET") {
    // Nëse nuk u dha cardNumber, kthe të gjithë klientët
    const { cardNumber } = req.query
    if (cardNumber) {
      const customer = await prisma.customer.findUnique({
        where: { cardNumber: String(cardNumber) },
        include: { purchases: true },
      })
      return res.status(200).json(customer)
    } else {
      const all = await prisma.customer.findMany({ include: { purchases: true } })
      return res.status(200).json(all)
    }
  }

  res.setHeader("Allow", ["GET", "POST"])
  res.status(405).end(`Method ${req.method} Not Allowed`)
}