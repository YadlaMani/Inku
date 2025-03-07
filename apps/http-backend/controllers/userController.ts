import type { Request, Response } from "express";
import { userSchema } from "../utils/userSchema";
import { prismaClient } from "../../../packages/db";
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
    });
  } catch (err) {
    res.status(400).json({
      message: "Somethign went wrong",
      error: err,
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { username, password } = req.body;
    const user = await prismaClient.user.findUnique({
      where: {
        username: username,
      },
    });
    if (!user) {
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      res.status(400).json({
        message: "Invalid username or password",
      });
      return;
    }
    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET_KEY!);
    res.status(200).json({
      message: "Login successful",
      token,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
