import {} from "react";
import UpdateBlogById from "./components/UpdateBlog";
interface ParamBlogType {
  slug: string;
}
function UpdateBlog({ params }: { params: ParamBlogType }) {
  const { slug } = params;
  return (
    <>
      <section>
        {slug}
        <UpdateBlogById slug={slug} />
      </section>
    </>
  );
}

export default UpdateBlog;
