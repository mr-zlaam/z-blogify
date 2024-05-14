import type { UserLoginTypes, UserRegisterTypes } from "@/types";
import { type ZodType, object, string } from "zod";

export const registerSchema: ZodType<UserRegisterTypes> = object({
  username: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(10, { message: "Username must not contain more than 10 characters" })
    .regex(new RegExp(/^[a-z0-9]+(_[a-z0-9]+)?(-[a-z0-9]+)?$/), {
      message: "Username is invalid.",
    })
    .toLowerCase(),
  fullname: string()
    .min(3, { message: "This field requires at least  3 characters" })
    .max(20, { message: "Full Name is too long" })
    .regex(new RegExp(/^[a-zA-Z0-9]+(?: [a-zA-Z0-9]+)*$/), {
      message: "Full name is invalid",
    }),
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(20, { message: "Email is too long" })
    .regex(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/), {
      message: "Please provide valid email",
    })
    .toLowerCase(),
  password: string()
    .min(6, { message: "This field requires at least 6 characters" })
    .max(20, { message: "Password is too long" }),
  confirmPassword: string()
    .min(6, { message: "This field requires at least 6 characters" })
    .max(20, { message: "Password is too long" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Confirmpassword is not same as passwords",
  path: ["confirmPassword"],
});

export const loginSchema: ZodType<UserLoginTypes> = object({
  email: string()
    .email()
    .min(5, { message: "This field requires at least 5 characters" })
    .max(20, { message: "Email is too long" })
    .regex(new RegExp(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/), {
      message: "Please provide valid email",
    })
    .toLowerCase(),
  password: string().min(1, { message: "This field is required" }),
});
