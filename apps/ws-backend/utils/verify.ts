import jwt, { type JwtPayload } from "jsonwebtoken";

export function checkUser(url: string) {
  try {
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token");

    if (!token) {
      return { message: "No token provided", success: false };
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId?: string };

    if (!decoded?.userId) {
      return { message: "Invalid token", success: false };
    }

    return { userId: decoded.userId, success: true };
  } catch (error) {
    return { message: "Invalid or expired token", success: false };
  }
}
