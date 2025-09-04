import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../../../core/config/database";

const JWT_SECRET = process.env.JWT_SECRET;

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

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET!,
      { expiresIn: "1h" }
    );
    const { password: _password, ...userWithoutPassword } = user;
    return { token, user: userWithoutPassword };
  }

  static async verifyToken(token: string) {
    return jwt.verify(token, JWT_SECRET!);
  }
}
