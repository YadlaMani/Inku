import { WebSocketServer } from "ws";
import { checkUser } from "./utils/verify";
import type { User } from "./types";
import { prismaClient } from "@repo/db/client";
const users: User[] = [];
const wss = new WebSocketServer({
  port: Number(process.env.PORT) || 5050,
});

wss.on("connection", async (ws, req) => {
  try {
    const url = req.url || "";
    const res = checkUser(url);

    if (!res.success || !res.userId) {
      ws.send(
        JSON.stringify({ message: res.message || "Invalid or expired token" })
      );
      ws.close();
      return;
    }

    ws.send(
      JSON.stringify({ message: `User connected with id: ${res.userId}` })
    );

    const user: User = { ws, userId: res.userId, rooms: [] };
    users.push(user);

    ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());

      if (parsedData.type === "join_room") {
        user.rooms.push(parsedData.roomId);
        console.log(`User ${user.userId} joined room ${parsedData.roomId}`);
      } else if (parsedData.type === "leave_room") {
        user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
        console.log(`User ${user.userId} left room ${parsedData.roomId}`);
      } else if (parsedData.type === "chat") {
        const { roomId, message } = parsedData;
        const chat = await prismaClient.chat.create({
          data: {
            message: message,
            roomId: roomId,
            userId: user.userId as string,
          },
        });

        users
          .filter((u) => u.rooms.includes(roomId))
          .forEach((u) => {
            if (u.ws.readyState === ws.OPEN) {
              u.ws.send(
                JSON.stringify({
                  sender: user.userId,
                  roomId,
                  message,
                  type: "message",
                })
              );
            }
          });
      }
    });

    ws.on("close", () => {
      console.log(`User disconnected with id: ${user.userId}`);
      const index = users.findIndex((u) => u.userId === user.userId);
      if (index !== -1) users.splice(index, 1);
    });

    ws.on("error", (err) => {
      console.error(`Error: ${err}`);
    });
  } catch (err) {
    ws.send(JSON.stringify({ message: "Invalid or expired token" }));
    ws.close();
  }
});
