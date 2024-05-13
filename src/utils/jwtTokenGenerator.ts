import { sign } from "jsonwebtoken";
import { _config } from "../config/config";
export const GenerateJWTAccessToken = (userId: string) => {
  const { JWT_ACCESS_SECRET } = _config;
  let accessToken = sign({ sub: userId }, JWT_ACCESS_SECRET, {
    expiresIn: "7d",
  });
  return accessToken;
};
