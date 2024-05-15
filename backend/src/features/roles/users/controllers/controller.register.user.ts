import type { NextFunction, Request, Response } from "express";
import { _config } from "../../../../config/config";
import ApiResponse from "../../../../utils/ApiResponse";
import { passwordHasher } from "../../../../utils/PasswordHasher";
import { asyncHandler } from "../../../../utils/asynchandler";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { GenerateJWTAccessToken } from "../../../../utils/jwtTokenGenerator";
import { UserModel } from "../models/model.user";
import { UserTypes } from "../types/types.user";
export default asyncHandler(async function registerUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props: UserTypes = req.body;
  const { username, email, fullName, password } = props;
  const { ADMIN_EMAIL, ADMIN_PASS } = _config;

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
  let isUserAlreadyexist;
  try {
    isUserAlreadyexist = await UserModel.findOne({
      $or: [{ username }, { email }],
    });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(
          ApiResponse(
            500,
            error.message || "internal server error while registering the user"
          )
        )
    );
  }
  if (isUserAlreadyexist) {
    return res
      .status(409)
      .json(ApiResponse(409, "username or email is already taken!"));
  }
  const isZlaam = email === ADMIN_EMAIL && password === ADMIN_PASS;
  // Password hashing
  let hashedPassword;
  try {
    hashedPassword = await passwordHasher(password, res);
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(ApiResponse(500, error.message || "internal server error"))
    );
  }
  let newUser;
  try {
    newUser = await UserModel.create({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      fullName,
      password: hashedPassword,
      role: isZlaam ? "admin" : "user",
    });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(ApiResponse(500, error.message || "internal server error"))
    );
  }
  let accessToken;
  try {
    accessToken = GenerateJWTAccessToken(newUser && newUser._id);
  } catch (error: any) {
    console.log(error.message);
    return res
      .status(500)
      .json(
        ApiResponse(
          500,
          error.message || "internal server error while generating token"
        )
      );
  }
  return res
    .status(201)
    .json(
      ApiResponse(201, "user registered successfully", null, { accessToken })
    );
});
