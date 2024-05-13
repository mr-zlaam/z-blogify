import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogTypes } from "../types/types.blog";

export default asyncHandler(async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { blogTitle, blogDescription, blogAuthor, isPublic }: BlogTypes =
    req.body;
  console.log("helloworld");
  return res.status(201).json(
    ApiResponse(201, "blog created successfully", null, {
      blogTitle,
      blogDescription,
      blogAuthor,
      isPublic,
    })
  );
});
