import type { Request, Response } from "express";
import { createRoomSchema } from "@repo/common/utils";
import { prismaClient } from "@repo/db/client";
import { nanoid } from "nanoid";
export const createRoom = async (req: Request, res: Response) => {
  try {
    const { name } = createRoomSchema.parse(req.body);
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const room = await prismaClient.room.create({
      data: {
        slug: name.toLowerCase().replace(" ", "-") + "-" + nanoid(5),
        adminId: req.userId,
      },
    });
    res.status(200).json({
      message: "Room created successfully",
      data: room,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
