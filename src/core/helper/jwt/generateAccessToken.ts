import jwt from "jsonwebtoken";

const JWT_SECRET_ACCESS_TOKEN: string = process.env.JWT_SECRET_ACCESS ?? "";

export const generateAccessToken = (userInfo: string) => {
  return jwt.sign(userInfo, JWT_SECRET_ACCESS_TOKEN, { expiresIn: "1h" });
};
