import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../core/config/database";
import {
  generateAccessToken,
  generateRefreshToken,
} from "../../../core/helper/jwt/generateTokens";

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
        roleId: false,
        deleted: false,
        createdAt: true,
        updatedAt: true,
      },
    });
    if (!user) throw new Error("User not found");

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error("Invalid credentials");

    const accessToken = generateAccessToken({ id: user.id });
    const refreshToken = generateRefreshToken({ id: user.id });

    return {
      accessToken: accessToken,
      refreshToken: refreshToken,
    };
  }
}
