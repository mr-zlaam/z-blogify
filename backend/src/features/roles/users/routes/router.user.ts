import { Router } from "express";
import getUser from "../controllers/controller.getUser";
import registerUser from "../controllers/controller.register.user";
import loginUser from "../controllers/controller.login.user";
import updateUser from "../controllers/controller.updateUser";
import updateBlogAuthMiddleware from "../../../../middlewares/updateBlogAuth.middleware";

export const userRouter = Router();

userRouter.post("/user/register", registerUser);
userRouter.post("/user/login", loginUser);
userRouter.get("/user/all", updateBlogAuthMiddleware, getUser);
userRouter.patch(
  "/user/updateUser/:userId",
  updateBlogAuthMiddleware,
  updateUser
);
userRouter.delete(
  "/user/deleteUser/:userId",
  updateBlogAuthMiddleware,
  updateUser
);
