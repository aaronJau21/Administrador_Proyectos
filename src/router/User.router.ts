import { Router } from "express";
import {
  confirmCount,
  create,
  login,
  resedPassword,
  resedPasswordToken,
} from "../controller/User.Controller";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.get("/confirm/:token", confirmCount);
router.get("/reset-password-token/:email", resedPasswordToken);
router.post("/reset_password", resedPassword);

export default router;
