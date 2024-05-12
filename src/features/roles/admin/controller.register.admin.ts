// controllers/admin/registerAdmin.ts
//TODO: Sovle the following bug "[1] Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client"
import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import { AdminTypes } from "./types.admin";
import { isAuthenticated } from "../../../utils/isAuthenticated";
import { asyncHandler } from "../../../utils/asynchandler";

export const registerAdmin = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const props: AdminTypes = req.body;
    isAuthenticated(props, res);
    return res.json(ApiResponse(200, "OK"));
  }
);
