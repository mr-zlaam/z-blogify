import { Router, response } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
import createBlog from "../controllers/controller.createBlog";
import draftBlogs from "../controllers/controller.draftBlog";
import publicBlogs from "../controllers/controller.publicBlogs";
import updateBlog from "../controllers/controller.updateBlogs";
import updateAndDeleteAuthMiddleware from "../../../middlewares/dashboardAuth.middleware";
import deleteBlog from "../controllers/controller.deleteBlog";
import getSingleBlog from "../controllers/controller.getSingleBlog";
import ApiResponse from "../../../utils/ApiResponse";
export const blogRouter = Router();

blogRouter.post("/createBlog", authTokenAuthenticator, createBlog);
blogRouter.get("/draftBlogs", updateAndDeleteAuthMiddleware, draftBlogs);
blogRouter.get("/publicBlogs", publicBlogs);
blogRouter.get("/getSingleBlog/:blogSlug", getSingleBlog);
blogRouter.get(
  "/checkUserIsSubAdminOrAdmin",
  authTokenAuthenticator,
  (req, res, next) => {
    return res
      .status(200)
      .json(ApiResponse(200, "You are authenticated to make changes"));
  }
);
blogRouter.get("/checkUserIsAdmin", updateAndDeleteAuthMiddleware);
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
