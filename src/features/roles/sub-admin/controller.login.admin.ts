import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../utils/ApiResponse";
import { AdminModel } from "./model.sub-admin";
import { asyncHandler } from "../../../utils/asynchandler";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { _config } from "../../../config/config";
export default asyncHandler(async function loginAdmin(
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
  const isAdminAlreadyExist = await AdminModel.findOne({ email });
  if (!isAdminAlreadyExist) {
    return res
      .status(404)
      .json(ApiResponse(404, "Admin is not existe with this email"));
  }
  const isCredentialMatch = await bcrypt.compare(
    password,
    isAdminAlreadyExist?.password
  );
  if (!isCredentialMatch)
    return res.status(403).json(ApiResponse(403, "Invalid Credentials"));
  const accessToken = sign(
    { sub: isAdminAlreadyExist?._id },
    JWT_ACCESS_SECRET,
    { expiresIn: "7d" }
  );
  return res
    .status(200)
    .json(
      ApiResponse(200, "Admin Signed in successfully", null, { accessToken })
    );
});
