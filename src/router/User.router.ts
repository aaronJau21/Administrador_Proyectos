import { Router } from "express";
import { create, login } from "../controller/User.Controller";

const router = Router();

router.post("/create", create);
router.post("/login", login);

export default router;
