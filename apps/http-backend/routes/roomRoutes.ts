import express from "express";
import {
  createRoom,
  getRoomChats,
  getRoomId,
} from "../controllers/roomController";

const router = express.Router();
export default router;
router.post("/create", createRoom);
router.get("/chats/:roomId", getRoomChats);
router.post("/roomId", getRoomId);
