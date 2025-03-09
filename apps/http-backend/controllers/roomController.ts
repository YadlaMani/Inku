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
export const getRoomChats = async (req: Request, res: Response) => {
  try {
    const { roomId } = req.params;
    if (!req.userId) {
      res.status(401).json({ message: "Unauthorized" });
      return;
    }
    const chats = await prismaClient.chat.findMany({
      where: {
        roomId,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 50,
    });
    res.status(200).json({
      message: "Chats fetched successfully",
      data: chats,
    });
  } catch (err) {
    res.status(400).json({
      message: "Something went wrong",
      error: err,
    });
  }
};
export const getRoomId = async (req: Request, res: Response) => {
  try {
    const { slug } = req.body;
    const room = await prismaClient.room.findUnique({
      where: {
        slug,
      },
    });
    if (!room) {
      res.json({
        message: "Room not found",
        success: false,
      });
      return;
    }
    res.json({
      message: "Room id fetched successfully",
      data: room.id,
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
