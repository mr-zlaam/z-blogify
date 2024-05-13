import mongoose, { Schema } from "mongoose";
import { type BlogTypes } from "../types/types.blog";

const blogSchema = new Schema<BlogTypes>(
  {
    blogAuthor: {
      type: String,
      required: [true, "Blog's Author name is required!"],
    },

    blogTitle: {
      type: String,
      required: [true, "Blog Title is required!"],
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
