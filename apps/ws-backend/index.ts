import { WebSocketServer } from "ws";
import type { Request } from "express";
const wss = new WebSocketServer({ port: 5050 });
wss.on("connection", (ws, req: Request) => {
  ws.on("error", () => console.log("Something went wrong"));
  const url = req.url;
  const queryParams = new URLSearchParams(url.split("?")[1]);
  const token = queryParams.get("token");
  if (!token) {
    ws.send(JSON.stringify({ message: "No token provided" }));
    ws.close();
  }
  ws.send(JSON.stringify({ message: "Connected" }));
  ws.on("message", (message) => {
    console.log(message);
  });
});
