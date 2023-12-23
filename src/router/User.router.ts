import { Router } from "express";
import { confirmCount, create, login } from "../controller/User.Controller";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.get("/confirm/:token", confirmCount);

export default router;
