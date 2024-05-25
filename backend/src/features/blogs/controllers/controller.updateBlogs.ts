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
  const { slug } = req.params;
  const {
    blogTitle,
    blogDescription,
    isPublic,
    blogAuthor,
    blogSlug,
    blogThumbnail,
    blogThumbnailAuthor,
  }: BlogTypes = req.body;

  // Convert isPublic to boolean if it's not already
  const isPublicBool = isPublic === true || isPublic === "true";

  if (
    !blogTitle ||
    !blogDescription ||
    !blogSlug ||
    !blogThumbnail ||
    !blogThumbnailAuthor
  ) {
    return next(
      res.status(403).json(ApiResponse(403, "All fields are required"))
    );
  }
  if (blogTitle.length <= 10) {
    return res
      .status(403)
      .json(ApiResponse(403, "Blog Title must be at least 10 characters."));
  }
  if (blogDescription.length <= 100) {
    return res
      .status(403)
      .json(ApiResponse(403, "Blog must contain at least 100 characters."));
  }

  let updateThisBlog;
  try {
    updateThisBlog = await BlogModel.findOneAndUpdate(
      { blogSlug: slug },
      {
        blogAuthor,
        blogThumbnail,
        blogThumbnailAuthor,
        blogTitle,
        blogSlug,
        blogDescription,
        isPublic: isPublicBool || false,
      }
    );
  } catch (error: any) {
    return next(
      res
        .status(500)
        .json(
          ApiResponse(
            500,
            error.message || "Something went wrong while updating blog post"
          )
        )
    );
  }

  return res
    .status(201)
    .json(ApiResponse(201, "Blog Updated Successfully", null, updateThisBlog));
});
