import mongoose, { Schema } from "mongoose";
import { type BlogTypes } from "../types/types.blog";

const blogSchema = new Schema<BlogTypes>(
  {
    blogAuthor: {
      type: String,
      required: [true, "Blog's Author name is required!"],
    },
    blogThumbnail: {
      type: String,
      required: [true, "Blog thumbnail is required!"],
      default: "",
    },
    blogThumbnailAuthor: {
      type: String,
      required: [true, "Blog thumbnail is required!"],
      default: "",
    },

    blogTitle: {
      type: String,
      required: [true, "Blog Title is required!"],
    },
    blogSlug: {
      type: String,
      required: [true, "Blog Slug is required!"],
    },
    blogDescription: {
      type: mongoose.Schema.Types.Mixed,
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
