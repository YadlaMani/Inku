import express from "express";
import { createRoom } from "../controllers/roomController";
const router = express.Router();
export default router;
router.post("/create", createRoom);
