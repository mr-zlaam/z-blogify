import type { Response } from "express";
import type { AdminTypes } from "../features/roles/admin/types.admin";
import ApiResponse from "./ApiResponse";

export const isAuthenticated = (props: AdminTypes, res: Response) => {
  const { username, fullName, email, password, role } = props;
  if (
    [fullName, email, username, password, role].some((field) => !field?.trim())
  ) {
    return res.json(ApiResponse(400, "All fields are required"));
  }
  const usernamePattern = /^[a-z0-9_.]/;
  const fullNamePattern = /^[a-zA-Z ]{3,20}$/;
  const passwordPattern =
    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/g;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!usernamePattern.test(username)) {
    return res.json(
      ApiResponse(
        401,
        "username is invalid",
        "correct username:john_doe,mr_23 "
      )
    );
  }
  if (!fullNamePattern.test(fullName)) {
    return res.json(
      ApiResponse(401, "FullName  is invalid", "correct FullName:John Doe ")
    );
  }
  if (!emailPattern.test(email)) {
    return res.json(
      ApiResponse(
        401,

        "email is invalid",
        "correct email:john_doe@example.com "
      )
    );
  }
  if (!passwordPattern.test(password)) {
    return res.json(
      ApiResponse(
        401,
        "Please choose Strong Password",
        "correct :ThisIsA$trongP@ss"
      )
    );
  }
  return true;
};
