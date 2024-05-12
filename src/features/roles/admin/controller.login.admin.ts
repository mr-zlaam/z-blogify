import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";

export default function loginAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(200).json(ApiResponse(200, "Admin Signed in successfully"));
}
