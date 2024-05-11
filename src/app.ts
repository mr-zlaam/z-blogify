import express from "express";
import { type Express } from "express";
import ApiResponse from "./utils/ApiResponse";
export const app: Express = express();
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.get("/", (req, res) => {
  return ApiResponse(res.statusCode, res, "Every thing is perfect");
});
