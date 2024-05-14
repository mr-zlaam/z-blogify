import { type NextFunction, type Request, type Response } from "express";
import { JsonWebTokenError, verify } from "jsonwebtoken";
import { asyncHandler } from "../utils/asynchandler";
import { _config } from "../config/config";
import ApiResponse from "../utils/ApiResponse";
import { UserModel } from "../features/roles/users/models/model.user";
export interface AuthRequest extends Request {
  authorId: string;
}

export default asyncHandler(async function authTokenAuthenticator(
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
        .json(ApiResponse(401, "You are not authenticate to make changes"))
    );
  const parsedToken = token?.split(" ")[1] as string;
  let decoded;
  try {
    decoded = verify(parsedToken, JWT_ACCESS_SECRET);
  } catch (error: any) {
    if (error instanceof JsonWebTokenError) {
      // Handle token validation errors
      return res
        .status(401)
        .json(
          ApiResponse(401, "Token is invalid. Please get the correct token")
        );
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
            "Internal server error while checking isAdmin or not"
          )
        )
    );
  }
  const Admin = isAdminOrSubAdmin?.role === "admin";
  const SubAdmin = isAdminOrSubAdmin?.role === "sub-admin";
  if (!Admin && !SubAdmin) {
    return res
      .status(403)
      .json(
        ApiResponse(
          403,
          "You are forbidden to make changes as you are not admin or sub-admin"
        )
      );
  }

  return next();
});
