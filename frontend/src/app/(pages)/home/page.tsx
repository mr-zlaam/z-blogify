import NavBar from "@/app/components/NavBar/NavBar";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { BACKEND_URI } from "@/config";
import { PublicBLogTypes } from "@/types";
import { Metadata } from "next";
import { Suspense, lazy } from "react";
import Logo from "./components/logo";
import ButtonLoader from "@/_subComponents/buttonLoader";
import CheckIfAdmin from "@/app/helper/checkIfAdmin/CheckIfAdmin";
import Link from "next/link";
import { Button } from "@/components/ui/button";
const BlogRendererComponent = lazy(() => import("./components/BlogRenderer"));
export const fetchBlogs = async () => {
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
  const isAdmin = await CheckIfAdmin();
  if (!data.success) return;
  const posts = data.data.publicBlogsList.reverse().slice(0, 6);
  const renderLoader = () => (
    <div className="h-[50dvh] justify-center flex items-center">
      <ButtonLoader />
    </div>
  );

  return (
    <PageWrapper className="lg:max-w-screen-xl ">
      <Logo />
      {isAdmin
        ? isAdmin.statusCode === 200 && (
            <Link href={"/admin/users"} className="block w-fit mx-auto my-4">
              <Button>Go To Admin Pannel</Button>
            </Link>
          )
        : ""}

      <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
      <NavBar />
      <Suspense fallback={renderLoader()}>
        <BlogRendererComponent posts={posts} />
      </Suspense>
    </PageWrapper>
  );
}

export default Home;

export const metadata: Metadata = {
  title: "Home - New Posts",
  creator: "mr-zlaam",
  publisher: "mr-zlaam",
  description: "",
};
