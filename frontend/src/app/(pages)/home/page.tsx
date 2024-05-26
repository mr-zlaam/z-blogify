import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { PublicBLogTypes } from "@/types";
import Link from "next/link";
import { Suspense, lazy } from "react";
import Logo from "./components/logo";
const BlogRendererComponent = lazy(() => import("./components/BlogRenderer"));
const fetchBlogs = async () => {
  try {
    const response = await fetch(`${BACKEND_URI}/blogs/publicBlogs`, {
      cache: "no-store",
    });
    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error("Some thing went wrong while fetching the data");
    }
  } catch (error: any) {
    return error;
  }
};
async function Home() {
  const data: PublicBLogTypes = await fetchBlogs();
  if (!data.success) return;
  const posts = data.data.publicBlogsList.reverse().slice(-6);
  const renderLoader = () => <p>Loading</p>;

  return (
    <PageWrapper className="lg:max-w-screen-xl ">
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
      <Suspense fallback={renderLoader()}>
        <BlogRendererComponent posts={posts} />
      </Suspense>
    </PageWrapper>
  );
}

export default Home;
