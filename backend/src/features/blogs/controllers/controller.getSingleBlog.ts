import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { BlogModel } from "../models/model.bog";
import { BlogTypes } from "../types/types.blog";
import ApiResponse from "../../../utils/ApiResponse";

export default asyncHandler(async function getSingleBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogSlug } = req.params;
  try {
    const getSingleBlog = await BlogModel.findOne({ blogSlug });
    return res.status(200).json(ApiResponse(200, "OK", null, getSingleBlog));
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
