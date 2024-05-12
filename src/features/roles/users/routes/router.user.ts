import { Router } from "express";
import getUser from "../controllers/controller.getUser";
import registerUser from "../controllers/controller.register.user";
import loginUser from "../controllers/controller.login.user";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/all", getUser);
