import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogModel } from "../models/model.bog";

export default asyncHandler(async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.params;
  const { blogTitle, blogDescription, isPublic, blogAuthor } = req.body;
  if (!blogTitle || !blogDescription || !isPublic) {
    return next(
      res.status(403).json(ApiResponse(403, "All fields are required"))
    );
  }
  if (isPublic !== "true" && isPublic !== "false")
    return res
      .status(400)
      .json(ApiResponse(400, "ispublic must be true or false."));
  let updateThisBlog;
  try {
    updateThisBlog = await BlogModel.findOneAndUpdate(
      { _id: blogId },
      {
        blogTitle,
        blogDescription,
        isPublic,
        blogAuthor,
      }
    );
  } catch (error: any) {
    return next(
      res
        .status(500)
        .json(ApiResponse(500, "Something went wrong while updating blogpost"))
    );
  }

  return res
    .status(201)
    .json(ApiResponse(201, "Blog Update Successfully", null, updateThisBlog));
});
