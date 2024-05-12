import { Router } from "express";
import getAdmin from "./controller.getAdmin";
import registerAdmin from "./controller.register.admin";
import loginAdmin from "./controller.login.admin";

export const authRouter = Router();

authRouter.post("/admin/register", registerAdmin);
authRouter.post("/admin/login", loginAdmin);
authRouter.get("/admin/all", getAdmin);
