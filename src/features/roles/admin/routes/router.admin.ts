import { Router } from "express";
import getAdmin from "../controllers/controller.getAdmin";
import registerAdmin from "../controllers/controller.register.admin";
import loginAdmin from "../controllers/controller.login.admin";

export const adminRouter = Router();

adminRouter.post("/admin/register", registerAdmin);
adminRouter.post("/admin/login", loginAdmin);
adminRouter.get("/admin/all", getAdmin);
