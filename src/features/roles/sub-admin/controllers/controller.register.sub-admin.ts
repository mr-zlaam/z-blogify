import type { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { SubAdminTypes } from "../types/types.sub-admin";
import { isAuthenticated } from "../../../../utils/isAuthenticated";
import { asyncHandler } from "../../../../utils/asynchandler";
import { SubAdminModel } from "../models/model.sub-admin";
import { passwordHasher } from "../../../../utils/PasswordHasher";
import { _config } from "../../../../config/config";
import { sign } from "jsonwebtoken";
export default asyncHandler(async function registerSubAdmin(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const props: SubAdminTypes = req.body;
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
  const isSubAdminRoleExist = await SubAdminModel.countDocuments();
  if (isSubAdminRoleExist >= 2)
    return res
      .status(409)
      .json(
        ApiResponse(
          409,
          "Only two sub-admins are allowed at one time!",
          "both sub-admins are already signed in."
        )
      );
  const isSubAdminExist = await SubAdminModel.findOne({
    $or: [{ username }, { email }],
  });
  if (isSubAdminExist) {
    return res
      .status(409)
      .json(ApiResponse(409, "user is already exist with same name or email!"));
  }
  const hashedPassword = await passwordHasher(password);
  // Password hashing
  const newSubAdmin = await SubAdminModel.create({
    username: username.toLowerCase(),
    email: email.toLowerCase(),
    fullName,
    password: hashedPassword,
    role: role.toLowerCase(),
  });
  const token = sign({ sub: newSubAdmin._id }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return res.json(
    ApiResponse(200, "SubAdmin registered successfully", null, {
      uid: newSubAdmin._id,
      email: newSubAdmin.email,
      name: newSubAdmin.fullName,
      accessToken: token,
    })
  );
});
