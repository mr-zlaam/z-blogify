import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { AdminModel } from "./model.admin";
import ApiResponse from "../../../utils/ApiResponse";

export default asyncHandler(async function GetAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const admin = await AdminModel.find().select("-password");
  if (!admin) {
    return res.status(404).json(ApiResponse(404, "admin not found"));
  }
  return res.status(200).json(ApiResponse(200, "OK", null, admin));
});
