import type WebSocket from "ws";

interface User {
  ws: WebSocket;
  rooms: string[];
  userId: string;
}
