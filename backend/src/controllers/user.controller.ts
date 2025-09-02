import { Request, Response } from "express";
import { db } from "../db/index.ts";
import { usersTable } from "../models/user.model.ts";
import { eq } from "drizzle-orm";
import { createHmac, randomBytes } from "node:crypto";

export const registerUser = async (req: Request, res: Response) => {
  const { firstname, lastname, email, password } = req.body;

  const [existingUser] = await db
    .select({
      id: usersTable.id,
    })
    .from(usersTable)
    .where(eq(usersTable.email, email));

  if (existingUser) {
    return res.status(400).json({ error: "User already exists" });
  }

  const salt = randomBytes(256).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(password)
    .digest("hex");

  const [user] = await db
    .insert(usersTable)
    .values({
      firstname,
      lastname,
      email,
      password: hashedPassword,
      salt,
    })
    .returning({
      id: usersTable.id,
    });

  return res.status(201).json({data: {userId: user.id}});
};

export const loginUser = async (req: Request, res: Response) => {
  res.send("Register");
};

export const logoutUser = async (req: Request, res: Response) => {
  res.send("Register");
};

export const updateUser = async (req: Request, res: Response) => {
  res.send("Register");
};
