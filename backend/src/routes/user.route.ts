import { Router } from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  updateUser,
} from "../controllers/user.controller.ts";

const router = Router();

router.post("/signup", registerUser);
router.post("/login", loginUser);
router.post("/update", updateUser);
router.post("/logout", logoutUser);

export default router;
