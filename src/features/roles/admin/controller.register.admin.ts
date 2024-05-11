// controllers/admin/registerAdmin.ts
import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import ApiErrors from "../../../utils/ApiError";
import { AdminTypes } from "./types.admin";
import { isAuthenticated } from "../../../utils/isAuthenticated";
import { asyncHandler } from "../../../utils/asynchandler";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const props = req.body;
    isAuthenticated(props, res);
    return res.json(ApiResponse(200, "OK"));
  }
);
