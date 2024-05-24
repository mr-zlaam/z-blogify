import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserModel } from "../models/model.user";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function GetSingleUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { userId } = req.params;
    const getUser = await UserModel.findById(userId).select("-password");
    return res.status(200).json(ApiResponse(200, "OK", null, getUser));
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(error.status || 500)
        .json(
          ApiResponse(
            error.status || 500,
            error.message || "internal server error while getting one user"
          )
        )
    );
  }
});
