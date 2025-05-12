import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const email = "festimesaraci1@gmail.com";
  const password = await bcrypt.hash("saraci.festime", 10);
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      password,
      role: "SUPERADMIN",
      name: "Super Admin",
    },
  });

  console.log("✅ Superadmin u shtua!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
