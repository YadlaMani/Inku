import { z } from "zod";
export const userSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  email: z.string().email("Invalid email address"),
});
export const loginSchema = z.object({
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(20, "Username must be at most 20 characters long"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});
export const createRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Room name must be at least 3 characters long")
    .max(20, "Room name must be at most 20 characters long"),
});
