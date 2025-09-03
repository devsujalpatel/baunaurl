import { Request } from "express";

export interface User {
  firstname: string;
  lastname?: string;
  email: string;
  hashedPassword: string;
  salt: string;
}

