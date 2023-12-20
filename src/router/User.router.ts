import { Router } from "express";
import { create } from "../controller/User.Controller";

const router = Router();

router.post("/create", create);

export default router;
