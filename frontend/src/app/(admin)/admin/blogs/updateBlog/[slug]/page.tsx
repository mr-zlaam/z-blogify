import {} from "react";
import UpdateBySlug from "./components/UpdateBlog";
import { API as axios } from "@/axios";
import { AxiosError } from "axios";
import { redirect } from "next/navigation";
interface ParamBlogType {
  slug: string;
}
const fetchSingleBlog = async (slug: string) => {
  try {
    const response = await axios.get(`/blogs/getSingleBlog/${slug}`);
    return response.data;
  } catch (error: any) {
    console.log(error.message);
    const err = error as AxiosError;
    return err.status;
  }
};
async function UpdateBlog({ params }: { params: ParamBlogType }) {
  const { slug } = params;
  const data = await fetchSingleBlog(slug);
  if (data.statusCode !== 200) {
    return redirect("/home");
  }
  const getSingleBlog = data.data!;
  return (
    <>
      <section>
        {slug}
        <UpdateBySlug updatedSlug={slug} getSingleBlog={getSingleBlog} />
      </section>
    </>
  );
}

export default UpdateBlog;
