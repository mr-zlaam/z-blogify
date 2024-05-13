import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { BlogModel } from "../models/model.bog";
import ApiResponse from "../../../utils/ApiResponse";

export default asyncHandler(async function draftBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const draftBlogList = await BlogModel.find();
  if (draftBlogList.length === 0) {
    return next(res.status(404).json(ApiResponse(400, "No draft Blogs Found")));
  }
  return res.status(200).json(ApiResponse(200, "OK", null, draftBlogList));
});
