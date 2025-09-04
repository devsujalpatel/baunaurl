import { Router } from "express";
import {
  deleteUrl,
  getUrls,
  redirectToUrl,
  shortenUrl,
} from "../controllers/url.controller.ts";
import {
  authenticationMiddleware,
  ensureAuthenticated,
} from "../middlewares/auth.middleware.ts";

const router = Router();

router.post(
  "/shorten",
  authenticationMiddleware,
  ensureAuthenticated,
  shortenUrl
);
router.get("/codes", authenticationMiddleware, ensureAuthenticated, getUrls);

router.get("/:shortCode", redirectToUrl);

router.delete(
  "/codes/:id",
  authenticationMiddleware,
  ensureAuthenticated,
  deleteUrl
);

export default router;
