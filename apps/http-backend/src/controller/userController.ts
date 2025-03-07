import { Request, Response } from "express";
import { userSchema } from "../utils/userSchema";
import bcrypt from "bcrypt";

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
  } catch (err) {
    res.status(400).json({
      message: "Somethign went wrong",
      error: err,
    });
  }
};
export const loginUser = async (req: Request, res: Response) => {
  res.send("login user");
};
