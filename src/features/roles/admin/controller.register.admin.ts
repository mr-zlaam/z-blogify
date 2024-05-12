import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import { AdminTypes } from "./types.admin";
import { isAuthenticated } from "../../../utils/isAuthenticated";
import { asyncHandler } from "../../../utils/asynchandler";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const props: AdminTypes = req.body;

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

    return res.json(ApiResponse(200, "OK"));
  }
);
