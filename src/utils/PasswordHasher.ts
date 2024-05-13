import bcrypt from "bcrypt";
import { Response } from "express";
import ApiResponse from "./ApiResponse";

export const passwordHasher = async (password: string, res: Response) => {
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    return hashedPassword;
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json(
        ApiResponse(500, "internal server error while hashing the password")
      );
  }
};
