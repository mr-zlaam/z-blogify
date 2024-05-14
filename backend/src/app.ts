import express, { Express } from "express";
import cors from "cors";
import { userRouter } from "./features/roles/users/routes/router.user";
import { blogRouter } from "./features/blogs/routes/router.blog";

export const app: Express = express();
app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//Authentication

app.use("/api/v1/auth", userRouter);
//Blogs Endpoints
app.use("/api/v1/blogs", blogRouter);
// Route handler for the root URL
app.get("/", (_, res) => {
  return res.send("Home Page is Working");
});
