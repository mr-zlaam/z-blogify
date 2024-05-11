import express from "express";
import { type Express } from "express";
import ApiResponse from "./utils/ApiResponse";
import { authRouter } from "./features/roles/admin/router.admin";
export const app: Express = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/auth/", authRouter);
app.get("/", (req, res) => {
  ApiResponse(res.statusCode, res, "Home Page is Working");
});
