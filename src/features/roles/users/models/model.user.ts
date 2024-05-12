import mongoose, { Schema } from "mongoose";
import { type UserTypes } from "../types/types.user";

const userSchema = new Schema<UserTypes>(
  {
    username: {
      type: String,
      required: [true, "Username is required!"],
      unique: true,
      default: "zlaam",
      match: [/^[a-z0-9_.]{1,20}$/, "Username is invalid"],
      lowercase: true,
      trim: true,
      minlength: [3, "Username must contain at least 3 characters"],
    },
    fullName: {
      type: String,
      required: [true, "FullName is required!"],
      unique: true,
      default: "zlaam",
      match: [/^[a-zA-Z ]{3,20}$/, "FullName is invalid"],
      lowercase: true,
      trim: true,
      minlength: [3, "FullName must contain at least 3 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      default: "zlaam.dev@gmail.com",
      lowercase: true,
      match: [/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, "Email is invalid!"],
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required!"],
      match: [
        /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?/~`-\s])[A-Za-z0-9!@#$%^&*()_+{}\[\]:;<>,.?/~`-\s]{6,}$/,
        "Please Choose the strong password!",
      ],
    },
    role: {
      type: String,
      required: [true, "Role is required!"],
      enum: ["admin", "sub-admin", "user"],
      default: "user",
    },
  },
  { timestamps: true }
);

export const UserModel = mongoose.model<UserTypes>("UserModel", userSchema);