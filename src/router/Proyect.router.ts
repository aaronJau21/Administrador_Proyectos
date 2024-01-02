import { Router } from "express";
import {
  addColaborator,
  deleteColaborator,
  deleteProyect,
  editProyect,
  getProyect,
  getProyects,
  getTasks,
  newProyect,
} from "../controller/Proyect.Controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.route("/").get(checkAuth, getProyects).post(checkAuth, newProyect);

router
  .route("/:id")
  .get(checkAuth, getProyect)
  .put(checkAuth, editProyect)
  .delete(checkAuth, deleteProyect);

router.get("/tasks", checkAuth, getTasks);
router.post("/add-colaborator/:id", checkAuth, addColaborator);
router.post("/delete-colaborator/:id", checkAuth, deleteColaborator);

export default router;
