import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import { AdminTypes } from "./types.admin";
import { isAuthenticated } from "../../../utils/isAuthenticated";
import { asyncHandler } from "../../../utils/asynchandler";
import { AdminModel } from "./model.admin";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const props: AdminTypes = req.body;
    const { username, email, fullName, password, role } = props;

    const authResult = isAuthenticated(props);
    if (typeof authResult !== "boolean" && authResult.statusCode >= 400) {
      return res
        .status(authResult.statusCode)
        .json(
          ApiResponse(
            authResult.statusCode,
            authResult.message,
            authResult.optMessage
          )
        );
    }
    const isAdminRoleExist = await AdminModel.findOne({ role: "admin" });
    if (isAdminRoleExist)
      return res
        .status(409)
        .json(ApiResponse(409, "Only One admin is allowed at one time!"));
    const isAdminExist = await AdminModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isAdminExist) {
      return res
        .status(409)
        .json(
          ApiResponse(409, "user is already exist with same name or email!")
        );
    }

    return res.json(ApiResponse(200, "Admin registered successfully"));
  }
);
