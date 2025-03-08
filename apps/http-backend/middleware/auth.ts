import jwt, { JwtPayload } from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      res.status(401).json({ message: "No token provided" });
      return;
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId?: number };

    if (!decoded?.userId) {
      res.status(401).json({ message: "Invalid token" });
      return;
    }

    req.userId = decoded.userId.toString();
    next();
  } catch (error) {
    res.status(401).json({
      message: "Invalid or expired token",
      error: (error as Error).message,
    });
  }
}
