import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserTypes } from "../types/types.user";
import { UserModel } from "../models/model.user";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function updateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  console.log(userId);
  const { username, fullName, email, role }: UserTypes = req.body;
  if (!username || !fullName || !email) {
    return res.status(403).json(ApiResponse(403, "Please provide all fields"));
  }
  if (role !== "admin" && role !== "user" && role !== "sub-admin")
    return res
      .status(404)
      .json(ApiResponse(403, "you can set only admin, sub-admin and user"));
  console.log(username, email, role, fullName);
  try {
    await UserModel.findOneAndUpdate(
      { _id: userId },
      {
        username,
        fullName,
        email,
        role,
      }
    ).select("-password");
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json(
        ApiResponse(
          500,
          error.message || "internal server error while updating the user."
        )
      );
  }
  return res
    .status(201)
    .json(ApiResponse(201, "user update successfully", null));
});
