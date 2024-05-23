import { Fragment } from "react";
import { API as axios } from "@/axios";
import parse from "html-react-parser";
const fetchBlogs = async () => {
  try {
    const response = await axios.get("/blogs/draftBlogs");
    return response.data;
  } catch (error: any) {
    return error;
  }
};
async function HomePage() {
  const data = await fetchBlogs();
  console.log(data);
  return (
    <>
      <section suppressHydrationWarning>
        {data.data.map((blog) => (
          <Fragment key={blog._id}>
            <h1>{blog.blogTitle}</h1>
            <p>{blog.blogDescription}</p>
          </Fragment>
        ))}
      </section>
    </>
  );
}

export default HomePage;
