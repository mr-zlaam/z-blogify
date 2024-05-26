import { SlugTypes } from "@/app/(admin)/admin/blogs/updateBlog/[slug]/page";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { useMessage } from "@/hooks/useMessage";
import { BlogDataTypes } from "@/types";
import {} from "react";
import SinglePost from "./components/SinglePost";
const fetchSinglePost = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URI}/blogs/getSingleBlog/${slug}`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Some thing went wrong");
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      return error;
    }
  }
};

async function GetSinglePost({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const { errorMessage, successMessage } = useMessage();
  const getDataFromSinglePost = await fetchSinglePost(slug);
  if (!getDataFromSinglePost.success) {
    return errorMessage("Some thing went wrong");
  }
  const { data } = getDataFromSinglePost;
  const singlePostData: BlogDataTypes = data!;
  console.log();
  return (
    <>
      <PageWrapper className="md:max-w-[820px] px-2">
        <SinglePost SinglePostData={singlePostData} />
      </PageWrapper>
    </>
  );
}

export default GetSinglePost;
