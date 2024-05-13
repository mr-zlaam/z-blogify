import mongoose, { Document } from "mongoose";
import { AdminTypes } from "../../roles/admin/types/types.admin";
import { SubAdminTypes } from "../../roles/sub-admin/types/types.sub-admin";

export interface BlogTypes extends Document {
  blogAuthor: AdminTypes | SubAdminTypes;
  blogTitle: string;
  createdByRef: string;
  blogDescription: string;
  isPublic: boolean | string;
  createdAt: Date;
  updatedAt: Date;
}
