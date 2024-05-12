import mongoose, { Document } from "mongoose";

export interface BlogTypes extends Document {
  blogAuthor: mongoose.Schema.Types.ObjectId;
  blogTitle: string;
  blogDescription: string;
  createdAt: Date;
  updatedAt: Date;
}
