import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogModel } from "../models/model.bog";

export default asyncHandler(async function draftBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const draftBlogs = await BlogModel.find({ isPublic: false }); // Query to find draft blogs
    if (draftBlogs.length === 0)
      return res.status(404).json(ApiResponse(404, "No draft blog found"));
    return res.status(200).json(ApiResponse(200, "OK", null, draftBlogs));
  } catch (error) {
    return res.status(500).json(ApiResponse(500, "Internal Server Error"));
  }
});
