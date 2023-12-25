import { Router } from "express";
import {
  confirmCount,
  create,
  login,
  perfil,
  resedPassword,
  resedPasswordToken,
} from "../controller/User.Controller";
import { checkAuth } from "../middleware/checkAuth";

const router = Router();

router.post("/create", create);
router.post("/login", login);
router.get("/confirm/:token", confirmCount);
router.get("/reset-password-token", resedPasswordToken);
router.post("/reset_password", resedPassword);

router.get("/perfil", [checkAuth], perfil);

export default router;
