import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import ApiErrors from "../../../utils/ApiError";

export default async function registerAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
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
