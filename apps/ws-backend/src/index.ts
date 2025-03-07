import { WebSocketServer } from "ws";
const wss = new WebSocketServer({ port: 5050 });
wss.on("connection", (ws) => {
  ws.on("error", () => console.log("Something went wrong"));
  ws.on("message", (message) => {
    console.log(`Received message => ${message}`);
    ws.send(`Received message => ${message}`);
  });
  ws.send("Connected to the server");
});
