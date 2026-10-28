import express from "express";
import { privateRoute } from "../config/passport.js";
import { taskController } from "../controllers/taskController.js";
const router = express.Router();

router.post("/newTask", privateRoute, taskController.createTask);
router.post("/completedTask/:id", privateRoute, taskController.completedTask);
router.get("/listTask", privateRoute, taskController.listTask);
router.delete("/deleteTask", privateRoute, taskController.deleteTask);


export default router;
