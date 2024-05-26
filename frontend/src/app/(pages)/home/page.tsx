import { Fragment } from "react";
import { API as axios } from "@/axios";
import parse from "html-react-parser";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import Logo from "./components/logo";
import { PublicBLogTypes } from "@/types";
import Link from "next/link";
import BlogRenderer from "./components/BlogRenderer";
const fetchBlogs = async () => {
  try {
    const response = await axios.get("/blogs/publicBlogs");

    if (response.data.success) return response.data;
  } catch (error: any) {
    return error;
  }
};
async function Home() {
  const data = await fetchBlogs();

  return (
    <PageWrapper className="md:max-w-screen-xl">
      <Logo />
      <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
      <div className="w-fit flex items-center gap-2 my-4">
        <Link href={"#"}>
          <span className="text-foreground text-xl font-bold">
            Latest Posts
          </span>
        </Link>
        <div className="h-8 w-1 rounded bg-foreground inline-block" />
        <Link href={"#"}>
          <span className="text-foreground text-xl font-bold">All Posts</span>
        </Link>
      </div>
      <BlogRenderer data={data} />
    </PageWrapper>
  );
}

export default Home;
