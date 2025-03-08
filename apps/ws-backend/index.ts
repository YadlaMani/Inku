import { WebSocketServer } from "ws";
import { checkUser } from "./utils/verify";
import jwt, { type JwtPayload } from "jsonwebtoken";
import type { User } from "./types";
const users: User[] = [];
const wss = new WebSocketServer({
  port: (process.env.PORT! as unknown as number) || 5050,
});
wss.on("connection", (ws, req) => {
  try {
    const url = req.url || "";
    const res = checkUser(url);
    if (!res.success) {
      ws.send(JSON.stringify({ message: res.message }));
      ws.close();
      return;
    }
    if (!res.userId) {
      ws.send(JSON.stringify({ message: "Invalid or expired token" }));
      ws.close();
      return;
    }
    ws.send(
      JSON.stringify({ message: `User connected with id: ${res.userId}` })
    );

    users.push({ ws, userId: res.userId, rooms: [] });

    ws.on("message", (data) => {
      const parsedData = JSON.parse(data as unknown as string);
      if (parsedData.type === "join_room") {
        const user = users.find((user) => user.userId === res.userId);
        user?.rooms.push(parsedData.roomId);
        console.log(`User ${res.userId} joined room ${parsedData.roomId}`);
      } else if (parsedData.type === "leave_room") {
        const user = users.find((user) => user.userId === res.userId);
        if (user) {
          user.rooms = user.rooms.filter((room) => room !== parsedData.roomId);
        }
        console.log(`User ${res.userId} left room ${parsedData.roomId}`);
      } else if (parsedData.type === "message") {
        const room = parsedData.roomId;
        const message = parsedData.message;
        const sender = res.userId;
        const user = users.find((user) => user.rooms.includes(room));
      }
    });
    ws.on("error", (err) => {
      console.log(`Error: ${err}`);
    });
    ws.on("close", () => {
      console.log(`User disconnected with id: ${res.userId}`);
    });
  } catch (err) {
    ws.send(JSON.stringify({ message: "Invalid or expired token" }));
    ws.close();
  }
});
