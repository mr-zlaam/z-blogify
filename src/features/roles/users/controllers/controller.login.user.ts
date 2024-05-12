import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { UserModel } from "../models/model.user";
import { asyncHandler } from "../../../../utils/asynchandler";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { _config } from "../../../../config/config";
export default asyncHandler(async function loginUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { JWT_ACCESS_SECRET } = _config;
  const props = req.body;
  const { email, password } = props;
  if (!email || !password) {
    return res.status(409).json(ApiResponse(409, "All fields are required."));
  }
  const isUserExist = await UserModel.findOne({ email });
  if (!isUserExist) {
    return res.status(404).json(ApiResponse(404, "Please register first"));
  }
  const isCredentialMatch = await bcrypt.compare(
    password,
    isUserExist?.password
  );
  if (!isCredentialMatch)
    return res.status(403).json(ApiResponse(403, "Invalid Credentials"));
  const accessToken = sign({ sub: isUserExist?._id }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json(
      ApiResponse(
        200,
        `${isUserExist?.fullName || "User"} is Signed in  successfully`,
        null,
        { accessToken }
      )
    );
});
