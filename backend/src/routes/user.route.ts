import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../controllers/user.controller.ts";
import { authenticationMiddleware } from "../middlewares/auth.middleware.ts";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticationMiddleware, logoutUser);

export default router;
