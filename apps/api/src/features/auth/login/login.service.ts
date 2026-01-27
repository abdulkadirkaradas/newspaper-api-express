import * as bcrypt from "bcrypt";
import { prisma } from "@/core/config/database";
import {
  generateAccessToken,
  generateRefreshToken,
} from "@/core/helper/jwt/generateTokens";
import { MESSAGES } from "../constants";

export class LoginService {
  static async login(email: string, password: string) {
    const user = await prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        email: true,
        password: true,
        emailVerifiedAt: false,
        roleId: true,
        deleted: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new Error(MESSAGES.ERROR.USER_NOT_FOUND);

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error(MESSAGES.ERROR.INVALID_CREDENTIALS);

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    return {
      accessToken,
      refreshToken,
      user: {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        username: user.username,
        roleId: user.roleId
      }
    };
  }

  static async user(id: string) {
    return await prisma.user.findFirst({
      where: { id: id },
      select: {
        id: true,
        name: true,
        lastname: true,
        username: true,
        email: true,
        password: false,
        emailVerifiedAt: true,
        roleId: true,
        deleted: true,
        createdAt: true,
        updatedAt: true,
      },
    });
  }
}
