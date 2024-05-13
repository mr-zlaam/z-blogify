import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogModel } from "../models/model.bog";
import { BlogTypes } from "../types/types.blog";

export default asyncHandler(async function updateBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogId } = req.params;
  const { blogTitle, blogDescription, isPublic, blogAuthor }: BlogTypes =
    req.body;
  if (!blogTitle || !blogDescription || !isPublic) {
    return next(
      res.status(403).json(ApiResponse(403, "All fields are required"))
    );
  }
  if (blogTitle.length <= 10) {
    return res
      .status(403)
      .json(ApiResponse(403, "Blog Title must be atleast 10 characters."));
  }
  if (blogDescription.length <= 100) {
    return res
      .status(403)
      .json(ApiResponse(403, "Blog  must container atleast 100 characters."));
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
