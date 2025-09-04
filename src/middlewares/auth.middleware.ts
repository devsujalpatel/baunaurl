import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.js";

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
  const tokenHeaders = req.headers["authorization"];

  if (!tokenHeaders) {
    return res.status(401).json({ error: "You are not logged in" });
  }

  if (!tokenHeaders.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  const token = tokenHeaders.split(" ")[1];

  try {
    const payload = verifyToken(token);
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
