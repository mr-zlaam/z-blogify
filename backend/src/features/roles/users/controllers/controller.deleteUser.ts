import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserModel } from "../models/model.user";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function deleteUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { userId } = req.params;
  let deleteThisUser;
  try {
    deleteThisUser = await UserModel.findOneAndDelete({ _id: userId });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(
          ApiResponse(
            500,
            error.message || "internal server error while deleting this user"
          )
        )
    );
  }
  return res
    .status(201)
    .json(
      ApiResponse(204, "Deleted this user successfully.", null, deleteThisUser)
    );
});
