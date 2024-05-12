import type { AdminTypes } from "../features/roles/admin/types/types.admin";

export const isAuthenticated = (props: AdminTypes) => {
  const { username, fullName, email, password, role } = props;
  if (
    [fullName, email, username, password, role].some((field) => !field?.trim())
  ) {
    return {
      statusCode: 400,
      message: "All Fields are required!",
      data: null,
    };
  }
  const usernamePattern = /^[a-z0-9_.]{1,20}$/;
  const fullNamePattern = /^[a-zA-Z ]{3,20}$/;
  const passwordPattern =
    /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-]{6,}$/g;
  const emailPattern = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
  if (!usernamePattern.test(username)) {
    return {
      statusCode: 401,
      message: "username is invalid",
      optMessage: "e.g: john_doe ",
      data: null,
    };
  }
  if (!fullNamePattern.test(fullName)) {
    return {
      statusCode: 401,
      message: "FullName is invalid",
      optMessage: "e.g: John Doe ",
      data: null,
    };
  }
  if (!emailPattern.test(email)) {
    return {
      statusCode: 401,
      message: "email is invalid",
      optMessage: "e.g:john_doe@example.com ",
      data: null,
    };
  }
  if (!passwordPattern.test(password)) {
    return {
      statusCode: 401,
      message: "Please Choose Strong Password",
      optMessage: "e.g :ThisIsA$trongP@ss",
      data: null,
    };
  }
  if (role === "admin" || role === "sub-admin" || role === "user") {
    return true;
  } else {
    return {
      statusCode: 401,
      message: "role is invalid",
      optMessage: "e.g: admin or sub-admin or user",
      data: null,
    };
  }
};
