import { Router } from "express";

export const blogRouter = Router();

blogRouter.get("/post", (req, res) => {
  return res.send("Hello world");
});
