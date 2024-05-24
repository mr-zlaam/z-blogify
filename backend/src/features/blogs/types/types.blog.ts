import { Document } from "mongoose";

export interface BlogTypes extends Document {
  blogAuthor: string;
  blogThumbnail: string;
  blogThumbnailAuthor: string;
  blogTitle: string;
  blogSlug: string;
  blogDescription: string;
  isPublic: boolean | string;
  createdAt: Date;
  updatedAt: Date;
}
