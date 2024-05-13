import { Router } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
import createBlog from "../controllers/controller.createBlog";
export const blogRouter = Router();

blogRouter.post("/createBlog", createBlog);
