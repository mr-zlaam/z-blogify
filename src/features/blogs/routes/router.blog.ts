import { Router } from "express";
import authTokenAuthenticator from "../../../middlewares/tokenAuth.middleware";
export const blogRouter = Router();

blogRouter.post("/post", authTokenAuthenticator, (req, res) => {
  return res.json({
    message: "Blog route is working",
  });
});
