import { Router } from "express";
import getSubAdmin from "../controllers/controller.getSubAdmin";
import registerSubAdmin from "../controllers/controller.register.sub-admin";
import subAdminLogin from "../controllers/controller.login.sub-admin";

export const subAdminRouter = Router();

subAdminRouter.post("/sub-admin/register", registerSubAdmin);
subAdminRouter.post("/sub-admin/login", subAdminLogin);
subAdminRouter.get("/sub-admin/all", getSubAdmin);
