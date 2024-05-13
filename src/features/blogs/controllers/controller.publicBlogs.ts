import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../utils/asynchandler";
import ApiResponse from "../../../utils/ApiResponse";
import { BlogModel } from "../models/model.bog";

export default asyncHandler(async function publicBlogs(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = parseInt(req.query.page as string) || 1; // Default page is 1
  const limit = parseInt(req.query.limit as string) || 10; // Default limit is 10

  const skip = (page - 1) * limit;

  try {
    const totalPublicBlogs = await BlogModel.countDocuments({ isPublic: true });
    const totalPages = Math.ceil(totalPublicBlogs / limit);

    const publicBlogsList = await BlogModel.find({ isPublic: true })
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalPublicBlogs: totalPublicBlogs,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    if (publicBlogsList.length === 0) {
      return res
        .status(404)
        .json(ApiResponse(404, "No public blogs found", null, { pagination }));
    }

    return res.status(200).json(
      ApiResponse(200, "OK", null, {
        pagination,
        publicBlogsList,
      })
    );
  } catch (error) {
    return res.status(500).json(ApiResponse(500, "Internal Server Error"));
  }
});
