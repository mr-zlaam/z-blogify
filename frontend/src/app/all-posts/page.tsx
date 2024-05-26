import {} from "react";
import PageWrapper from "../components/PageWrapper/PageWrapper";
import NavBar from "../components/NavBar/NavBar";
import GoBack from "./components/GoBack/GoBack";
import RenderAllPosts from "./components/RenderAllPosts/RenderAllPosts";
import { fetchBlogs as FetchAllPost } from "../(pages)/home/page";
import { PublicBLogTypes } from "@/types";
import { useMessage } from "@/hooks/useMessage";
async function AllPosts() {
  const { errorMessage } = useMessage();
  const getAllPosts: PublicBLogTypes = await FetchAllPost();
  if (!getAllPosts.success) return errorMessage("Some thing went wrong!~");
  const { publicBlogsList } = getAllPosts.data;
  const allPosts = publicBlogsList.reverse();
  return (
    <>
      <PageWrapper className="md:max-w-screen-lg">
        <GoBack />
        <NavBar />
        <hr className="md:max-w-screen-xl mx-auto my-3 bg-foreground rounded h-1" />
        <RenderAllPosts allPosts={allPosts} />
      </PageWrapper>
    </>
  );
}

export default AllPosts;
