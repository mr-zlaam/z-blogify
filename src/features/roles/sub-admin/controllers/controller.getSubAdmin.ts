import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { SubAdminModel } from "../models/model.sub-admin";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function GetSubAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getSubAdmin = await SubAdminModel.find().select("-password");
  if (!getSubAdmin) {
    return res.status(404).json(ApiResponse(404, "admin not found"));
  }
  return res.status(200).json(ApiResponse(200, "OK", null, getSubAdmin));
});
