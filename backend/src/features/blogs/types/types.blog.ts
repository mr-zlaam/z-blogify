import { Document } from "mongoose";

export interface BlogTypes extends Document {
  blogAuthor: String;
  blogTitle: string;
  createdByRef: string;
  blogSlug: string;
  blogDescription: string;
  isPublic: boolean | string;
  createdAt: Date;
  updatedAt: Date;
}
