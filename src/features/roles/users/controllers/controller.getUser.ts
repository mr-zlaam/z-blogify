import type { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserModel } from "../models/model.user";
import ApiResponse from "../../../../utils/ApiResponse";

export default asyncHandler(async function GetUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const page = parseInt(req.query.page as string) || 1; // Default page is 1
  const limit = parseInt(req.query.limit as string) || 20; // Default limit is 20

  const skip = (page - 1) * limit;

  try {
    const totalUsers = await UserModel.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    if (page > totalPages) {
      return res.status(404).json(
        ApiResponse(404, "Page not found", null, {
          totalPages,
          requestedPage: page,
        })
      );
    }

    const getUsers = await UserModel.find()
      .select("-password")
      .skip(skip)
      .limit(limit);

    const pagination = {
      currentPage: page,
      totalPages: totalPages,
      totalUsers: totalUsers,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1,
    };

    if (getUsers.length === 0) {
      return res.status(404).json(
        ApiResponse(404, "No users found on this page", null, {
          pagination,
        })
      );
    }

    return res.status(200).json(
      ApiResponse(200, "OK", null, {
        pagination,
        getUsers,
      })
    );
  } catch (error) {
    return res.status(500).json(ApiResponse(500, "Internal Server Error"));
  }
});
