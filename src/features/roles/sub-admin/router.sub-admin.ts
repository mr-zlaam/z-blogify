import { Router } from "express";
import getAdmin from "./controller.getAdmin";
import registerSubAdmin from "./controller.register.sub-admin";
import loginAdmin from "./controller.login.admin";

export const subAdminRouter = Router();

subAdminRouter.post("/sub-admin/register", registerSubAdmin);
// subAdminRouter.post("/admin/login", loginAdmin);
// subAdminRouter.get("/admin/all", getAdmin);
