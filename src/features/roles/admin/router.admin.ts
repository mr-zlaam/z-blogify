import ApiResponse from "../../../utils/ApiResponse";
import { Router } from "express";

export const authRouter = Router();

authRouter.get("/admin", (req, res) => {
  return ApiResponse(res.statusCode, res, "AminRoute is Working");
});
