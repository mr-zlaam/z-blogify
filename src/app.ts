import express, { Express } from "express";
import { adminRouter } from "./features/roles/admin/routes/router.admin";
import { subAdminRouter } from "./features/roles/sub-admin/routes/router.sub-admin";
import { userRouter } from "./features/roles/users/routes/router.user";

export const app: Express = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use("/api/v1/auth/", adminRouter);
app.use("/api/v1/auth/", subAdminRouter);
app.use("/api/v1/auth/", userRouter);

// Route handler for the root URL
app.get("/", (req, res) => {
  res.send("Home Page is Working");
});
