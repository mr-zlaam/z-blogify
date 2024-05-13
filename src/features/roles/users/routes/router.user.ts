import { Router } from "express";
import getUser from "../controllers/controller.getUser";
import registerUser from "../controllers/controller.register.user";
import loginUser from "../controllers/controller.login.user";
import updateUser from "../controllers/controller.updateUser";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/all", getUser);
userRouter.patch("/user/updateUser/userId", updateUser);
userRouter.delete("/user/deleteUser/:userId", updateUser);
