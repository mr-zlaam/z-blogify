import { Router } from "express";
import getUser from "../controllers/controller.getUser";
import registerUser from "../controllers/controller.register.user";
import loginUser from "../controllers/controller.login.user";
import updateUser from "../controllers/controller.updateUser";
import dashboardAuthMiddleware from "../../../../middlewares/dashboardAuth.middleware";
import deleteUser from "../controllers/controller.deleteUser";
import getSingleUser from "../controllers/controller.getSingleUser";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/all", dashboardAuthMiddleware, getUser);
userRouter.patch(
  "/user/updateUser/:userId",
  dashboardAuthMiddleware,
  updateUser
);
userRouter.get(
  "/user/getSingleUser/:userId",
  dashboardAuthMiddleware,
  getSingleUser
);
userRouter.delete(
  "/user/deleteUser/:userId",
  dashboardAuthMiddleware,
  deleteUser
);
