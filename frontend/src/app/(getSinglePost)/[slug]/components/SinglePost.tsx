"use client";
import { Button } from "@/components/ui/button";
import { BlogDataTypes } from "@/types";
import { ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {} from "react";

function SinglePost({ SinglePostData }: { SinglePostData: BlogDataTypes }) {
  const router = useRouter();
  return (
    <>
      <article>
        <div
          className=" my-10 bg-transparent text-foreground cursor-pointer h-[40px] w-[40px] flex justify-center items-center duration-300 transition-all rounded-full hover:bg-foreground hover:text-background "
          onClick={() => {
            router.back();
          }}
        >
          <ChevronLeft />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-center">
            {SinglePostData.blogTitle}
          </h1>
          <div className="flex  items-center"></div>
        </div>
      </article>
    </>
  );
}

export default SinglePost;
