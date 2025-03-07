import jwt from "jsonwebtoken";
import type { NextFunction, Request, Response } from "express";
export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const decode = jwt.verify(token, process.env.JWT_SECRET_KEY!);
  if (!decode) {
    res.status(401).json({
      message: "Unauthorized",
    });
    return;
  }
  const userId = (decode as { userId: number }).userId;
  req.userId = userId.toString();
  next();
}
