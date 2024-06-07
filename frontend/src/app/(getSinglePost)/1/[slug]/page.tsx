import { SlugTypes } from "@/app/(admin)/admin/blogs/updateBlog/[slug]/page";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { useMessage } from "@/hooks/useMessage";
import { BlogDataTypes, PublicBLogTypes } from "@/types";
import React from "react";
import SinglePost from "./components/SinglePost";
import { redirect } from "next/navigation";
import { Metadata } from "next";
import parser from "html-react-parser";
import { fetchBlogs } from "@/app/helper/fetchAllBlogs/FetchAllBlogs";
//generate Static params
export async function generateStaticParams() {
  const res: PublicBLogTypes = await fetchBlogs();
  const posts = res.data.publicBlogsList;
  return posts.map(({ blogSlug }) => blogSlug);
}

const fetchSinglePost = async (slug: string) => {
  try {
    const response = await fetch(`${BACKEND_URI}/blogs/getSingleBlog/${slug}`, {
      cache: "no-store",
    });
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error: any) {
    console.log(error);
    if (error instanceof Error) {
      return error;
    }
  }
};

export async function generateMetadata({
  params,
}: {
  params: SlugTypes;
}): Promise<Metadata> {
  const response = await fetch(
    `${BACKEND_URI}/blogs/getSingleBlog/${params?.slug as string}`
  );
  const post = await response.json();
  const { data: getDataFromSinglePost } = post;
  const data: BlogDataTypes = getDataFromSinglePost;
  return {
    title: data.blogTitle,
    description: (parser(data.blogDescription) as string) || "", // Ensure description is a string
    openGraph: {
      images: [
        {
          url: data.blogThumbnail,
        },
      ],
    },
  };
}

async function GetSinglePost({ params }: { params: SlugTypes }) {
  const { slug } = params;
  const { errorMessage } = useMessage();
  if (!slug) return redirect("/home");
  const getDataFromSinglePost = await fetchSinglePost(slug);
  if (!getDataFromSinglePost.success) {
    errorMessage("Something went wrong while loading post!!.");
    return redirect("/home");
  }
  const { data } = getDataFromSinglePost;
  const singlePostData: BlogDataTypes = data!;
  return (
    <>
      <PageWrapper className="md:max-w-[820px] px-4">
        <SinglePost SinglePostData={singlePostData} />
      </PageWrapper>
    </>
  );
}

export default GetSinglePost;
