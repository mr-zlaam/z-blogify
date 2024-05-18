import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { blogRouter } from "./features/blogs/routes/router.blog";
import { userRouter } from "./features/roles/users/routes/router.user";

export const app: Express = express();
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
//Authentication
app.use("/api/v1/auth", userRouter);
//Blogs Endpoints
app.use("/api/v1/blogs", blogRouter);
// Route handler for the root URL
