// import type { NextFunction, Request, Response } from "express";
// import { asyncHandler } from "../utils/asynchandler";
// import { JsonWebTokenError, verify } from "jsonwebtoken";
// import { _config } from "../config/config";
// import ApiResponse from "../utils/ApiResponse";
// export default asyncHandler(async function checkIsUserAdmin(req:Request, res:Response, next:NextFunction) {
//   const {JWT_ACCESS_SECRET}= _config
//   const token = req.header("Authorization");
//     const parsedToken = token?.split(" ")[1] as string;
//   let decoded;
//   try {
//     decoded = verify(parsedToken, JWT_ACCESS_SECRET);
//   } catch (error) {
//     if (error instanceof JsonWebTokenError) {
//       // Handle token validation errors
//       return res.status(401).json(ApiResponse(401, "Token is invalid"));
//     } else {
//       return next(error); // Forward other errors to the error handling middleware
//     }
//   }
// })
