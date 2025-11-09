import { PrismaClient } from "../../generated/prisma/client";

export const prisma = new PrismaClient();

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
