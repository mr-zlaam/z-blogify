import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserModel } from "../models/model.user";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function GetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const getUser = await UserModel.find().select("-password");
  if (getUser.length === 0) {
    return res
      .status(404)
      .json(ApiResponse(404, "Not a single user has been created yet"));
  }
  return res.status(200).json(ApiResponse(200, "OK", null, getUser));
});
