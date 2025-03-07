import express from "express";
const router = express.Router();
export default router;
router.get("/", (req, res) => {
  res.json({
    message: `room created for user: ${req.userId}`,
  });
});
