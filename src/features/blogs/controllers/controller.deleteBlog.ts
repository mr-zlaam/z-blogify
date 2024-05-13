import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { BlogModel } from "../models/model.bog";
import ApiResponse from "../../../utils/ApiResponse";

export default asyncHandler(async function deleteBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.params;

  let deleteThisBlog;
  try {
    deleteThisBlog = await BlogModel.findOneAndDelete({ _id: blogId });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(
          ApiResponse(
            500,
            error.message || "Unable to delete Blog for some Reason"
          )
        )
    );
  }
  return res
    .status(204)
    .json(ApiResponse(204, "Blog deleted successfully", null, deleteThisBlog));
});
