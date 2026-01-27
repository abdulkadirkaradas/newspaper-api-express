import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
}

const JWT_SECRET_ACCESS_TOKEN: string = process.env.JWT_SECRET_ACCESS ?? "";
const JWT_SECRET_REFRESH_TOKEN: string = process.env.JWT_SECRET_REFRESH ?? "";

export const generateRefreshToken = (userInfo: UserPayload) => {
  return jwt.sign({ userId: userInfo.id }, JWT_SECRET_REFRESH_TOKEN, {
    expiresIn: "7d",
  });
};

export const generateAccessToken = (userInfo: UserPayload) => {
  return jwt.sign({ userId: userInfo.id }, JWT_SECRET_ACCESS_TOKEN, {
    expiresIn: "15m",
  });
};

export const verifyRefreshToken = (token: string): UserPayload | null => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET_REFRESH_TOKEN) as { userId: string };
    return { id: decoded.userId };
  } catch (error) {
    return null;
  }
};
