import jwt from "jsonwebtoken";

const JWT_SECRET_TOKEN: string = process.env.JWT_SECRET ?? "";

export const generateAccessToken = (userInfo: string) => {
  return jwt.sign(userInfo, JWT_SECRET_TOKEN, { expiresIn: "1h" });
};
