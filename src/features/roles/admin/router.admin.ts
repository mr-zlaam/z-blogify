import ApiResponse from "../../../utils/ApiResponse";
import { Router } from "express";
import registerAdmin from "./controller.register.admin";

export const authRouter = Router();

authRouter.get("/admin", (req, res) => {
  return ApiResponse(res.statusCode, res, "AminRoute is Working");
});
authRouter.post("/admin", registerAdmin);
