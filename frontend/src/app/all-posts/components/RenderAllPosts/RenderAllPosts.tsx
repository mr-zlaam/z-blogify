"use client";
import { Card } from "@/components/ui/card";
import { BlogDataTypes } from "@/types";
import Image from "next/image";
import { Fragment } from "react";
import parser from "html-react-parser";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import moment from "moment";

function RenderAllPosts({ allPosts }: { allPosts: BlogDataTypes[] }) {
  const router = useRouter();
  if (allPosts.length === 0)
    return (
      <div className="h-[100dvh] w-full flex justify-center items-center font-bold text-3xl flex-col md:flex-row">
        No Post Found!~
      </div>
    );
  return (
    <>
      {/* TODO:Search Field add for blog posts */}
      <section className="flex flex-col gap-4  w-full py-5">
        {allPosts.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="h-[400px] flex gap-4 rounded-md shadow-lg overflow-hidden ">
                <div className="flex-1 flex max-w-[500px] overflow-hidden">
                  <Image
                    src={post.blogThumbnail || "/logo/Zlaam.jpg"}
                    alt={post.blogAuthor}
                    width={500}
                    height={500}
                    className="object-cover"
                  />
                </div>
                <div className="flex-1 flex flex-col max-w-[400px]   justify-center gap-4 px-4">
                  <h1 className="text-3xl font-bold my-2 mx-3 ">
                    {post.blogTitle}
                  </h1>
                  <Button className="max-w-[300px] mx-5">
                    <Link href={`/${post.blogSlug}`}>Go to Post</Link>
                  </Button>
                  <div className="flex  items-center my-4 gap-3 px-4">
                    <Image
                      src={"/logo/Zlaam.jpg"}
                      alt="Zlaam"
                      width={50}
                      height={50}
                      className="rounded-full"
                    />
                    <div className="flex flex-col justify-start">
                      <h1 className="text-lg font-semibold ">
                        {post.blogAuthor}
                      </h1>
                      <p className="text-sm text-left">
                        {moment(post.createdAt).format("MMMM-Do-YYYY")}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </Fragment>
          );
        })}
      </section>
    </>
  );
}

export default RenderAllPosts;
