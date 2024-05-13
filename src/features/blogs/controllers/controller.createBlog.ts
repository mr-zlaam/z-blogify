import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import { asyncHandler } from "../../../utils/asynchandler";
import { isBlogAuthenticated } from "../../../utils/isBlogAuthenticated";
import { BlogModel } from "../models/model.bog";
import { BlogTypes } from "../types/types.blog";

export default asyncHandler(async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props = req.body;
  const { blogTitle, blogDescription, blogAuthor }: BlogTypes = props;
  const isblogAuth = isBlogAuthenticated(props)!;
  if (typeof isblogAuth !== "boolean" && isblogAuth?.statusCode >= 400) {
    return next(
      res
        .status(isblogAuth.statusCode)
        .json(ApiResponse(isblogAuth.statusCode, isblogAuth.message))
    );
  }

  const newBlog = await BlogModel.create({
    blogTitle,
    blogDescription,
    blogAuthor: "Zlaam",
    isPublic: false,
  });
  return res
    .status(201)
    .json(ApiResponse(201, "blog created successfully", null, newBlog));
});
