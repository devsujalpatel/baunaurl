import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/token.ts";
import { JwtPayload } from "jsonwebtoken";

// Extend Express Request type
declare global {
  namespace Express {
    interface Request {
      user?: string | JwtPayload;
    }
  }
}

export function authenticationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
 

  const cookieToken = req.cookies.token;

  if(!cookieToken) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const payload = verifyToken(cookieToken);
    req.user = payload;
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }

  return next();
}
