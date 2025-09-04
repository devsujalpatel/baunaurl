import { Request, Response } from "express";

import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
  userUpdatePatchRequestBodySchema,
} from "../validation/request.validation.ts";
import { hashPasswordWithSalt } from "../utils/hash.ts";
import {
  createUser,
  getUserByEmail,
  getUserById,
} from "../services/user.service.ts";
import { createUserToken } from "../utils/token.ts";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const validationResult = await signupPostRequestBodySchema.safeParseAsync(
      req.body
    );

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { firstname, lastname, email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
      return res
        .status(400)
        .json({ error: `User with email: ${email} already exists` });
    }

    const { salt, hashedPassword } = hashPasswordWithSalt(password);

    const user = await createUser({
      firstname,
      lastname,
      email,
      hashedPassword,
      salt,
    });
    return res.status(201).json({ data: { userId: user.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const validationResult = await loginPostRequestBodySchema.safeParseAsync(
      req.body
    );

    if (validationResult.error) {
      return res.status(400).json({ error: validationResult.error.format() });
    }

    const { email, password } = validationResult.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser) {
      return res
        .status(404)
        .json({ error: `User with email: ${email} does not exists` });
    }

    const { salt: userSalt, hashedPassword } = existingUser;

    const { hashedPassword: newHashedPassword } = hashPasswordWithSalt(
      password,
      userSalt
    );

    if (hashedPassword !== newHashedPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const token = await createUserToken({ id: existingUser.id });

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 24 * 60 * 60 * 1000,
    });

    return res
      .status(200)
      .json({ message: "Login successful", data: { userId: existingUser.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.clearCookie("token", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });

  return res.status(200).json({ message: "Logout successful" });
};

