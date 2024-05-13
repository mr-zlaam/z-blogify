import { BlogTypes } from "../features/blogs/types/types.blog";

export const isBlogAuthenticated = (props: BlogTypes) => {
  const { blogTitle, blogDescription, isPublic } = props;
  if (
    [blogTitle, blogDescription, isPublic].some(
      (field) => !field?.toString().trim()
    )
  ) {
    return {
      statusCode: 400,
      message: "All fields are required1",
      data: null,
    };
  }
};
