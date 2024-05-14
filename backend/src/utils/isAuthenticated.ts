import { UserTypes } from "../features/roles/users/types/types.user";

export const isAuthenticated = (props: UserTypes) => {
  const { username, fullName, email, password } = props;
  if ([fullName, email, username, password].some((field) => !field?.trim())) {
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
      message: "Please choose valid password",
      optMessage: "e.g :ThisIsA$trongP@ss",
      data: null,
    };
  }
  return true;
};
