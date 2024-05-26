"use client";
import { Card } from "@/components/ui/card";
import { BlogDataTypes, PublicBLogTypes } from "@/types";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import { Fragment } from "react";

export default function BlogRenderer({ posts }: { posts: BlogDataTypes[] }) {
  return (
    <Fragment>
      <div className="grid grid-cols-3 gap-4">
        {posts.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="min-h-[60dvh] ronuded overflow-hidden relative my-2 ">
                <div className=" p-4 min-h-[60%] overflow-hidden">
                  <Image
                    src={post.blogThumbnail || "/logo/logo.jpeg"}
                    alt={post.blogThumbnailAuthor || "zlaam"}
                    className="rounded"
                    width={0}
                    height={0}
                    sizes="100vw"
                    style={{ width: "100%", height: "auto" }}
                  />
                </div>
                <h1 className="text-xl font-bold text-balance px-4  text-clip line-clamp-1">
                  <span>{post.blogTitle}</span>
                </h1>
                <div className="my-2 flex gap-3 items-center px-3 absolute bottom-2 w-full">
                  <Image
                    src={"/logo/logo.jpeg"}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="zlaam"
                  />
                  <div>
                    {post.blogAuthor} &nbsp;&nbsp;- &nbsp;&nbsp;
                    {moment(post.createdAt).format("MMMM Do YYYY")}
                  </div>
                </div>
              </Card>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
