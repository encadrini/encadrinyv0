import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
// initialize Prisma Client
const prisma = new PrismaClient();
import dotenv from "dotenv";

dotenv.config();

async function main() {
  const hashed = await bcrypt.hash("1234", 10);
  const user1 = await prisma.user.create({
    data: {
      username: "Khalil",
      email: "khalil@gmail.com",
      password: hashed,
      role: "ENCADRANT",
    },
  });
}


// execute the main function
main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // close Prisma Client at the end
    await prisma.$disconnect();
  });
