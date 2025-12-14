import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "../../generated/prisma/client";

const connectionString = `${process.env.DATABASE_URL}`;
const adapter = new PrismaPg({ connectionString });
export const prisma = new PrismaClient({ adapter });

export async function getUserInformation(id: string) {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      lastname: true,
      username: true,
      email: true,
      password: false,
      blocked: false,
      emailVerifiedAt: false,
      roleId: true,
      deleted: false,
      createdAt: false,
      updatedAt: false,
    },
  });
}
