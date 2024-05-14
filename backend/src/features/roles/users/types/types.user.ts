import type { Document } from "mongoose";

export interface UserTypes extends Document {
  username: string;
  fullName: string;
  email: string;
  password: string;
  role: "admin" | "user" | "sub-admin";
  createdAt: Date;
  updatedAt: Date;
}
