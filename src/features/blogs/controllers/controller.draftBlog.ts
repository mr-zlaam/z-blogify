import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import { BlogModel } from "../models/model.bog";

export default asyncHandler(async function draftBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const drafBLogsList = await BlogModel.find();
});
