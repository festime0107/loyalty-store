import { PrismaClient } from "@prisma/client";

declare global {
  let prisma: PrismaClient | undefined; // ✅ përdor `let`, jo `var`
}

export {};
