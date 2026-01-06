import bcrypt from "bcrypt";
import { prisma } from "@/core/config/database";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/core/helper/jwt/generateTokens";
import { ROLE } from "@/core/helper/constants/role.constants";

interface Register {
  name: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export class RegisterService {
  static async register(data: Register) {
    const { name, lastname, username, email, password } = data;
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = prisma.user.create({
      data: {
        name,
        lastname,
        username,
        email,
        password: hashedPassword,
        emailVerifiedAt: null,
        roleId: ROLE.WRITER,
      },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        email: true,
        password: false,
        emailVerifiedAt: false,
        roleId: false,
        deleted: false,
        createdAt: true,
        updatedAt: true,
      },
    });

    const userId = (await user).id;
    const accessToken = generateAccessToken({ id: userId });
    const refreshToken = generateRefreshToken({ id: userId });

    return {
      accessToken,
      refreshToken,
    };
  }
}
