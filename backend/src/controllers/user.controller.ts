import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import {
  signupPostRequestBodySchema,
  loginPostRequestBodySchema,
} from "../validation/request.validation.ts";
import { hashPasswordWithSalt, matchPassword } from "../utils/hash.ts";
import { createUser, getUserByEmail } from "../services/user.service.ts";

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
        .json({ error: `User with email: ${email} does not exists` });
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

    const { salt, hashedPassword } = existingUser;

    const { newHashedPassword } = matchPassword(password, salt, hashedPassword);

    if (hashedPassword !== newHashedPassword) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    return res.status(200).json({ data: { userId: existingUser.id } });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send("Register");
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("Register");
};
