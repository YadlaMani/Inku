import { WebSocketServer } from "ws";

import jwt, { JwtPayload } from "jsonwebtoken";
const wss = new WebSocketServer({ port: 5050 });
wss.on("connection", (ws, req) => {
  try {
    const url = req.url || "";
    const queryParams = new URLSearchParams(url.split("?")[1]);
    const token = queryParams.get("token") || "";
    if (!token) {
      ws.send(JSON.stringify({ message: "No token provided" }));
      ws.close();
      return;
    }
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY!
    ) as JwtPayload & { userId?: number };
    if (!decoded?.userId) {
      ws.send(JSON.stringify({ message: "Invalid token" }));
      ws.close();
      return;
    }
    console.log(`User connected with id: ${decoded.userId}`);
    ws.send(
      JSON.stringify({ message: `User connected with id: ${decoded.userId}` })
    );
    ws.on("message", (message) => {
      console.log(`Received message ${message}`);
    });
    ws.on("error", (err) => {
      console.log(`Error: ${err}`);
    });
    ws.on("close", () => {
      console.log(`User disconnected with id: ${decoded.userId}`);
    });
  } catch (err) {
    ws.send(JSON.stringify({ message: "Invalid or expired token" }));
    ws.close();
  }
});
