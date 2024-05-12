import { NextFunction, Request, Response } from "express";
import ApiResponse from "../../../../utils/ApiResponse";
import { SubAdminModel } from "../models/model.sub-admin";
import { asyncHandler } from "../../../../utils/asynchandler";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { _config } from "../../../../config/config";
export default asyncHandler(async function subAdminLogin(
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
  const isSubAdminExist = await SubAdminModel.findOne({ email });
  if (!isSubAdminExist) {
    return res
      .status(404)
      .json(ApiResponse(404, "Sub-Admin is not exist with this email"));
  }
  const isCredentialMatch = await bcrypt.compare(
    password,
    isSubAdminExist?.password
  );
  if (!isCredentialMatch)
    return res.status(403).json(ApiResponse(403, "Invalid Credentials"));
  const accessToken = sign({ sub: isSubAdminExist?._id }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return res
    .status(200)
    .json(
      ApiResponse(
        200,
        `${isSubAdminExist?.fullName || "User"} is Signed in as sub-admin successfully`,
        null,
        { accessToken }
      )
    );
});
