import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { UserTypes } from "../types/types.user";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { asyncHandler } from "../../../../utils/asynchandler";
import { UserModel } from "../models/model.user";
import { passwordHasher } from "../../../../utils/PasswordHasher";
import { _config } from "../../../../config/config";
import { sign } from "jsonwebtoken";
export default asyncHandler(async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props: UserTypes = req.body;
  const { username, email, fullName, password } = props;
  const { JWT_ACCESS_SECRET, ADMIN_EMAIL, ADMIN_PASS } = _config;

  const authResult = isAuthenticated(props);
  if (typeof authResult !== "boolean" && authResult.statusCode >= 400) {
    return res
      .status(authResult.statusCode)
      .json(
        ApiResponse(
          authResult.statusCode,
          authResult.message,
          authResult.optMessage
        )
      );
  }

  const isUser = await UserModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isUser) {
    return res
      .status(409)
      .json(
        ApiResponse(409, "user is already exist with same username or email!")
      );
  }
  const isZlaam = email === ADMIN_EMAIL && password === ADMIN_PASS;
  const hashedPassword = await passwordHasher(password);
  // Password hashing
  const newUser = await UserModel.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullName,
    password: hashedPassword,
    role: isZlaam ? "admin" : "user",
  });
  const token = sign({ sub: newUser._id }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return res.json(
    ApiResponse(201, "user registered successfully", null, {
      _id: newUser._id,
      email: newUser.email,
      name: newUser.fullName,
      accessToken: token,
    })
  );
});
//My lord is Allah and no is worthy of worship except him
