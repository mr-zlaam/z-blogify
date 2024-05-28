import { NextFunction, Request, Response, Router, response } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
import createBlog from "../controllers/controller.createBlog";
import draftBlogs from "../controllers/controller.draftBlog";
import publicBlogs from "../controllers/controller.publicBlogs";
import updateBlog from "../controllers/controller.updateBlogs";
import updateAndDeleteAuthMiddleware from "../../../middlewares/dashboardAuth.middleware";
import deleteBlog from "../controllers/controller.deleteBlog";
import getSingleBlog from "../controllers/controller.getSingleBlog";
import ApiResponse from "../../../utils/ApiResponse";
import isUserLoginedMiddleware from "../../../middlewares/isUserLogined.middleware";
export const blogRouter = Router();

blogRouter.post("/createBlog", authTokenAuthenticator, createBlog);
blogRouter.get("/draftBlogs", updateAndDeleteAuthMiddleware, draftBlogs);
blogRouter.get("/publicBlogs", publicBlogs);
blogRouter.get("/getSingleBlog/:blogSlug", getSingleBlog);
blogRouter.get(
  "/checkUserIsSubAdminOrAdmin",
  authTokenAuthenticator,
  (req: Request, res, next: NextFunction) => {
    return res
      .status(200)
      .json(ApiResponse(200, "You are authenticated to make changes"));
  }
);
blogRouter.get(
  "/checkIfuserIsAdmin",
  updateAndDeleteAuthMiddleware,
  (req: Request, res, next: NextFunction) => {
    return res
      .status(200)
      .json(ApiResponse(200, "As you are admin you can do anything."));
  }
);
blogRouter.get(
  "/checkIfUserLogin",
  isUserLoginedMiddleware,
  (req: Request, res: Response, next: NextFunction) => {
    return res.status(200).json(ApiResponse(200, "User is Logined."));
  }
);

blogRouter.patch(
  "/updateBlog/:slug",
  updateAndDeleteAuthMiddleware,
  updateBlog
);
blogRouter.delete(
  "/deleteBlog/:blogId",
  updateAndDeleteAuthMiddleware,
  deleteBlog
);
