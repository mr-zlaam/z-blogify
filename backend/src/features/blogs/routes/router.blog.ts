import { Router } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
import createBlog from "../controllers/controller.createBlog";
import draftBlogs from "../controllers/controller.draftBlog";
import publicBlogs from "../controllers/controller.publicBlogs";
import updateBlog from "../controllers/controller.updateBlogs";
import updateAndDeleteAuthMiddleware from "../../../middlewares/dashboardAuth.middleware";
import deleteBlog from "../controllers/controller.deleteBlog";
export const blogRouter = Router();

blogRouter.post("/createBlog", authTokenAuthenticator, createBlog);
blogRouter.get("/draftBlogs", draftBlogs);
blogRouter.get("/publicBlogs", publicBlogs);
blogRouter.put(
  "/updateBlog/:blogId",
  updateAndDeleteAuthMiddleware,
  updateBlog
);
blogRouter.delete(
  "/deleteBlog/:blogId",
  updateAndDeleteAuthMiddleware,
  deleteBlog
);
