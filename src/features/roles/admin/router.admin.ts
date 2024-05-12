import { Router } from "express";
import getAdmin from "./controller.getAdmin";
import registerAdmin from "./controller.register.admin";
import loginAdmin from "./controller.login.admin";

export const adminRouter = Router();

adminRouter.post("/admin/register", registerAdmin);
adminRouter.post("/admin/login", loginAdmin);
adminRouter.get("/admin/all", getAdmin);
