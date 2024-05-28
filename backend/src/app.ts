import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Express } from "express";
import { blogRouter } from "./features/blogs/routes/router.blog";
import { userRouter } from "./features/roles/users/routes/router.user";
import bodyParser from "body-parser";
export const app: Express = express();
const corsOptions = {
  origin: ["http://localhost:3000", "http://192.168.100.39:3000"],
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//Authentication
app.use("/api/v1/auth", userRouter);
//Blogs Endpoints
app.use("/api/v1/blogs", blogRouter);
// Route handler for the root URL
