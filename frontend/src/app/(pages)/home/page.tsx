import { Fragment } from "react";
import { API as axios } from "@/axios";
import parser from "html-react-parser";
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
  console.log(data);
  return (
    <section>
      <PageWrapper>
        {data &&
          data.data.map((posts: any) => {
            return (
              <Fragment key={posts._id}>
                <h1 className="text-3xl font-bold">{posts.blogTitle}</h1>
                <div>{parser(posts.blogDescription)}</div>
              </Fragment>
            );
          })}
      </PageWrapper>
    </section>
  );
}

export default Home;
