import { BACKEND_URI } from "@/config";
import axios from "axios";
import {} from "react";
const loadContent = async () => {
  console.log("backend_uri", BACKEND_URI);
  try {
    const response = await axios.get(`${BACKEND_URI}/blogs/draftBlogs`);
    return response.data;
  } catch (error: any) {
    console.log("error:", error.message);
  }
};
async function HomePage() {
  const data = await loadContent();
  console.log(data);
  return (
    <>
      <section>HomePage</section>
    </>
  );
}

export default HomePage;
