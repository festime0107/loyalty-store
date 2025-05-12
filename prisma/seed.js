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
  await prisma.user.upsert({
    where: { email: "admin1@example.com" },
    update: {},
    create: {
      email: "admin1@example.com",
      password: await bcrypt.hash("adminpass", 10),
      role: "ADMIN",
      name: "Admin 1"
    }
  });
  

  console.log("✅ Superadmin u shtua!");
  await prisma.$disconnect();
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
