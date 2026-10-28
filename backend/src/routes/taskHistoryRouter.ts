import express from "express";
import { privateRoute } from "../config/passport.js";
import { taskHistoryController } from "../controllers/taskHistoryController.js";
const router = express.Router();

router.get("/listHistoryTask", privateRoute, taskHistoryController.listTaskHistory);
router.delete("/deleteTaskHistory", privateRoute, taskHistoryController.deleteTaskHistory);


export default router;
