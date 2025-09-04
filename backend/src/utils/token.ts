import jwt from "jsonwebtoken";
import { userTokenSchema } from "../validation/token.validation.ts";

const JWT_SECRET = process.env.JWT_SECRET!;

export const createUserToken = async (payload: object) => {
  const validationResult = await userTokenSchema.safeParseAsync(payload);

  if (validationResult.error) {
    throw new Error(validationResult.error.message);
  }

  const payloadValidatedData = validationResult.data;

  return jwt.sign(payloadValidatedData, JWT_SECRET, {
    expiresIn: "1d",
  });
};

export const verifyToken = (token: string) => {
  const decoded = jwt.verify(token, JWT_SECRET);

  // jwt.verify can return string | JwtPayload, so validate with Zod
  const result = userTokenSchema.safeParse(decoded);

  if (!result.success) {
    throw new Error("Invalid token payload");
  }

  return result.data;
};
