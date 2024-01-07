import { Router } from "express";
import {
  addTask,
  changeState,
  deleteTask,
  getTask,
  updateTask,
} from "../controller/TaskController";

import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/", checkAuth, addTask);
router
  .route("/:id")
  .get(checkAuth, getTask)
  .put(checkAuth, updateTask)
  .delete(checkAuth, deleteTask);

router.post("/estado/:id", checkAuth, changeState);

export default router;
