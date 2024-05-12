import mongoose, { Schema } from "mongoose";
import { type BlogTypes } from "../types/types.blog";

const blogSchema = new Schema<BlogTypes>(
  {
    blogAuthor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "sub-admin",
      required: [true, "Blog's Author name is required!"],
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
  },
  { timestamps: true }
);
export const BlogModel = mongoose.model<BlogTypes>("BlogModel", blogSchema);
