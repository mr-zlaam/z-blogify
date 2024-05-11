import express from "express";
import { type Express } from "express";
export const app: Express = express();

app.get("/", (req, res) => {
  res.send("Hello World");
});
