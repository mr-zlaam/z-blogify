import { NextFunction, Request, Response } from "express";
import { verify, JsonWebTokenError } from "jsonwebtoken"; // Import JsonWebTokenError to catch token validation errors
import { asyncHandler } from "../utils/asynchandler";
import { _config } from "../config/config";
import ApiResponse from "../utils/ApiResponse";
import { UserModel } from "../features/roles/users/models/model.user";

export interface AuthRequest extends Request {
  authorId: string;
}

export default asyncHandler(async function updateAndDeleteAuthMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { JWT_ACCESS_SECRET } = _config;
  const token = req.header("Authorization");
  if (!token)
    return next(
      res
        .status(401)
        .json(ApiResponse(401, "You are not authenticated to make changes"))
    ); // Changed the response message

  const parsedToken = token?.split(" ")[1] as string;
  let decoded;

  try {
    decoded = verify(parsedToken, JWT_ACCESS_SECRET);
  } catch (error) {
    if (error instanceof JsonWebTokenError) {
      // Handle token validation errors
      return res.status(401).json(ApiResponse(401, "Token is invalid"));
    } else {
      return next(error); // Forward other errors to the error handling middleware
    }
  }

  const _req = req as AuthRequest;
  _req.authorId = decoded.sub as string;
  const userId = _req.authorId;

  let isAdminOrSubAdmin;
  try {
    isAdminOrSubAdmin = await UserModel.findById(userId);
  } catch (error: any) {
    return next(
      res
        .status(500)
        .json(
          ApiResponse(
            500,
            "Internal server error while checking if user is admin"
          )
        )
    );
  }

  const Admin = isAdminOrSubAdmin?.role === "admin";

  if (!Admin) {
    return res
      .status(403)
      .json(
        ApiResponse(
          403,
          "Only Admin can delete or update the data.",
          null,
          null
        )
      );
  }
  return next();
});
