import express from "express";
const app = express();
app.get("/", (req, res) => {
  res.json("Backend is alive");
});
console.log("Hello world");
app.listen(5555, () => {
  console.log("Server is running on port 5555");
});
