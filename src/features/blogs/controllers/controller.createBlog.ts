import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogTypes } from "../types/types.blog";
import { isBlogAuthenticated } from "../../../utils/isBlogAuthenticated";
import { AuthRequest } from "../../../middlewares/tokenAuth.middleware";

export default asyncHandler(async function createBlog(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props = req.body;
  const { blogTitle, blogDescription, blogAuthor, isPublic }: BlogTypes = props;
  const isblogAuth = isBlogAuthenticated(props)!;
  if (typeof isblogAuth !== "boolean" && isblogAuth?.statusCode >= 400) {
    return next(
      res
        .status(isblogAuth.statusCode)
        .json(ApiResponse(isblogAuth.statusCode, isblogAuth.message))
    );
  }
  const _req = req as AuthRequest;
  const userId = _req.authorId;
  console.log(userId);
  return res.status(201).json(
    ApiResponse(201, "blog created successfully", null, {
      blogTitle,
      blogDescription,
      blogAuthor,
      isPublic,
    })
  );
});
