import jwt, { type JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.json({ message: "No token provided", success: false });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId?: String };

    if (!decoded?.userId) {
      res.json({ message: "Invalid token", success: false });
      return;
    }

    req.userId = decoded.userId.toString();
    next();
  } catch (error) {
    res.json({
      message: "Invalid or expired token",
      error: (error as Error).message,
      success: false,
    });
  }
}
