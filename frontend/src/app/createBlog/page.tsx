import {} from "react";
import CreatePosts from "./components/Post";
import Link from "next/link";

function CreateBLog() {
  return (
    <>
      <h1 className="py-5 bg-background z-[99]  text-center font-bold text-xl sticky top-0 w-full ">
        <Link
          href="/home"
          className="duration-300 transition-all hover:text-blue-300"
        >
          Go To Home Page
        </Link>
      </h1>
      <CreatePosts />
    </>
  );
}

export default CreateBLog;
