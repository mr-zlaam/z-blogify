import ApiResponse from "../../../utils/ApiResponse";
import { Router } from "express";
import registerAdmin from "./controller.register.admin";
import getAdmin from "./controller.getAdmin";

export const authRouter = Router();

authRouter.post("/admin", registerAdmin);
authRouter.get("/admin", getAdmin);
