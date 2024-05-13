import { Router } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
import createBlog from "../controllers/controller.createBlog";
import draftBlogs from "../controllers/controller.draftBlog";
export const blogRouter = Router();

blogRouter.post("/createBlog", authTokenAuthenticator, createBlog);
blogRouter.get("/draftBlogs", draftBlogs);
