import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.ts";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
      };
    }
  }
}

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const cookieToken = req.cookies.token;

  if (!cookieToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyToken(cookieToken);
    req.user = payload;

    return next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
}

export function ensureAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.user || !req.user.id) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  next();
}
