import {} from "react";
import UpdateBlogById from "./components/UpdateBlog";
interface ParamBlogType {
  blogId: string;
}
function UpdateBlog({ params }: { params: ParamBlogType }) {
  const { blogId } = params;
  return (
    <>
      <section>
        <UpdateBlogById blogId={blogId} />
      </section>
    </>
  );
}

export default UpdateBlog;
