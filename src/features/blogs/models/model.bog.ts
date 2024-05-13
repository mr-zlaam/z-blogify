import mongoose, { Schema } from "mongoose";
import { type BlogTypes } from "../types/types.blog";

const blogSchema = new Schema<BlogTypes>(
  {
    blogAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      required: [true, "Blog's Author name is required!"],
    },
    createdByRef: {
      type: String,
      required: [true, "createdByRef is required for polymorphic reference"],
      enum: ["SubAdminModel", "AdminModel"],
    },
    blogTitle: {
      type: String,
      required: [true, "Blog Title is required!"],
      unique: true,
    },
    blogDescription: {
      type: String,
      required: [true, "Blog description is required!"],
    },
    isPublic: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);
export const BlogModel = mongoose.model<BlogTypes>("BlogModel", blogSchema);
