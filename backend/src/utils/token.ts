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
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    throw null;
  }
};
