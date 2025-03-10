import express from "express";
import {
  createRoom,
  getRoomChats,
  getRoomId,
  getRooms,
} from "../controllers/roomController";

const router = express.Router();
export default router;
router.post("/create", createRoom);
router.get("/chats/:roomId", getRoomChats);
router.post("/roomId", getRoomId);
router.get("/", getRooms);
