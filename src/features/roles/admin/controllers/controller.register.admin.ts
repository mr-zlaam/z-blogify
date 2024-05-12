import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { AdminTypes } from "../types/types.admin";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { asyncHandler } from "../../../../utils/asynchandler";
import { AdminModel } from "../models/model.admin";
import { passwordHasher } from "../../../../utils/PasswordHasher";
import { _config } from "../../../../config/config";
import { sign } from "jsonwebtoken";
export default asyncHandler(async function registerAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props: AdminTypes = req.body;
  const { username, email, fullName, password, role } = props;
  const { JWT_ACCESS_SECRET } = _config;

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
  const isAdminRoleExist = await AdminModel.findOne({ role: "admin" });
  if (isAdminRoleExist)
    return res
      .status(409)
      .json(
        ApiResponse(
          409,
          "Only One admin is allowed at one time!",
          "admin is already signed in"
        )
      );
  const isAdminExist = await AdminModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isAdminExist) {
    return res
      .status(409)
      .json(ApiResponse(409, "user is already exist with same name or email!"));
  }
  const hashedPassword = await passwordHasher(password);
  // Password hashing
  const newAdmin = await AdminModel.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullName,
    password: hashedPassword,
    role: role.toLowerCase(),
  });
  const token = sign({ sub: newAdmin._id }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return res.json(
    ApiResponse(200, "Admin registered successfully", null, {
      uid: newAdmin._id,
      email: newAdmin.email,
      name: newAdmin.fullName,
      accessToken: token,
    })
  );
});
