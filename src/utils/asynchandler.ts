import { NextFunction, Request, Response } from "express";
import ApiResponse from "./ApiResponse";

const asyncHandler = (requestHandler: any) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(requestHandler(req, res, next)).catch((error: any) =>
      next(
        res
          .status(500)
          .json(ApiResponse(500, error.message || "internal server error"))
      )
    );
  };
};
export { asyncHandler };
