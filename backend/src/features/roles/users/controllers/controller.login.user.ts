import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { asyncHandler } from "../../../../utils/asynchandler";
import { GenerateJWTAccessToken } from "../../../../utils/jwtTokenGenerator";
import { UserModel } from "../models/model.user";
import { _config } from "../../../../config/config";
export default asyncHandler(async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props = req.body;
  const { email, password } = props;
  if (!email || !password) {
    return res.status(409).json(ApiResponse(409, "All fields are required."));
  }
  let isUserExist;
  try {
    isUserExist = await UserModel.findOne({ email });
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(
          ApiResponse(500, error.message || "internal server error while login")
        )
    );
  }

  if (!isUserExist) {
    return res.status(404).json(ApiResponse(404, "Please register first"));
  }
  let isCredentialMatch;
  try {
    isCredentialMatch = await bcrypt.compare(password, isUserExist?.password);
  } catch (error: any) {
    console.log(error.message);
    return next(
      res
        .status(500)
        .json(ApiResponse(500, error.message || "internal server error"))
    );
  }
  if (!isCredentialMatch)
    return res.status(403).json(ApiResponse(403, "Invalid Credentials"));
  let accessToken;
  try {
    accessToken = GenerateJWTAccessToken(isUserExist?._id || "");
  } catch (error: any) {
    return next(
      res
        .status(500)
        .json(ApiResponse(500, error.message || "internal server error"))
    );
  }
  return res
    .cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: _config.ENV_DEV,
      sameSite: "lax",
    })
    .status(200)
    .json(
      ApiResponse(
        200,
        `${isUserExist?.fullName || "User"}  Signed in  successfully`,
        null,
        { accessToken }
      )
    );
});
