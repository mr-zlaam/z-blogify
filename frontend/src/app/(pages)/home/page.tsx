import { Fragment } from "react";
import { API as axios } from "@/axios";
import parse from "html-react-parser";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
const fetchBlogs = async () => {
  try {
    const response = await axios.get("/blogs/draftBlogs");

    if (response.data.success) return response.data;
  } catch (error: any) {
    return error;
  }
};
async function Home() {
  const data = await fetchBlogs();
  return <section></section>;
}

export default Home;
