import express, { Express } from "express";
import { authRouter } from "./features/roles/admin/router.admin";

export const app: Express = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

app.use("/api/v1/auth/", authRouter);

// Route handler for the root URL
app.get("/", (req, res) => {
  res.send("Home Page is Working");
});
