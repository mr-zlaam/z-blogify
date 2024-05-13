import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { BlogModel } from "../models/model.bog";
import ApiResponse from "../../../utils/ApiResponse";

export default asyncHandler(async function draftBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const BlogsLists = await BlogModel.find();
  const draftBlogs = BlogsLists?.filter((blogs) => {
    return blogs.isPublic !== "false";
  });
  return res.status(200).json(ApiResponse(200, "OK", null, draftBlogs));
});
