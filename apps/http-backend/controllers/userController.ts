import type { Request, Response } from "express";
import { userSchema, loginSchema } from "@repo/common/utils";
import { prismaClient } from "@repo/db/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, password, email } = userSchema.parse(req.body);
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });
    if (user) {
      res.status(400).json({
        message: "username already exists",
        success: false,
      });
      return;
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prismaClient.user.create({
      data: {
        username,
        password: hashedPassword,
        email,
      },
    });
    const token = jwt.sign({ userId: newUser.id }, process.env.JWT_SECRET_KEY!);

    res.status(201).json({
      message: "user created successfully",
      data: newUser,
      token,
      success: true,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.json({
        message: "Invalid username or password",
        success: false,
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.json({
        message: "Invalid username or password",
        success: false,
      });
      return;
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!);
    res.json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (err) {
    res.json({
      message: "Something went wrong",
      error: err,
      success: false,
    });
  }
};
