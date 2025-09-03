import { createHmac, randomBytes } from "node:crypto";

export function hashPasswordWithSalt(password: string) {
  try {
    const salt = randomBytes(256).toString("hex");
    const hashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return { salt, hashedPassword };
  } catch (error) {
    console.error(error);
    throw error;
  }
}

export function matchPassword(
  password: string,
  salt: string,
  hashedPassword: string
) {
  try {
    const newHashedPassword = createHmac("sha256", salt)
      .update(password)
      .digest("hex");

    return { newHashedPassword };
  } catch (error) {
    console.error(error);
    throw error;
  }
}
