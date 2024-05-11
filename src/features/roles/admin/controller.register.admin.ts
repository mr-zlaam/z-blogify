import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import ApiErrors from "../../../utils/ApiError";
import { AdminTypes } from "./types.admin";

export default async function registerAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { username, fullName, email, password, role }: AdminTypes = req.body;
    if (
      [fullName, email, username, password, role].some(
        (field) => !field?.trim()
      )
    ) {
      ApiResponse(400, res, "All fields are required");
    }
    ApiResponse(res.statusCode || 200, res, "registerAdmin OK");
  } catch (error: any) {
    return next(
      ApiErrors(
        500,
        res,
        error.message || "Something went wrong while registering the user"
      )
    );
  }
}
