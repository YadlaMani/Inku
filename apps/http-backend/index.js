//external imports
import express from "express";
import "dotenv/config";
import cors from "cors";
//internal imports
import userRouter from "./routes/userRoutes";
//app setup
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 5555;
app.listen(5555, () => {
  console.log("Server is running on port 5555");
});
app.get("/", (req, res) => {
  res.send("/server is alive");
});
//user routes
app.use("/api/v1/user", userRouter);
