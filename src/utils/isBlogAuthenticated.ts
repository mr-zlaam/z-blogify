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
  if (blogTitle.trim().length <= 10) {
    return {
      statusCode: 403,
      message: "Blog title must be at least 10 characters",
      data: null,
    };
  }
  if (blogDescription.length <= 60) {
    return {
      statusCode: 403,
      message: "Blog must be atleast 60 characters long!",
      data: null,
    };
  }
  if (isPublic !== "false" && isPublic !== "true") {
    return {
      statusCode: 403,
      message: "isPublic must be true or false.",
    };
  }
  return true;
};
