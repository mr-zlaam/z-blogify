"use client";
import ImgLoader from "@/_subComponents/imgLoader";
import { Card } from "@/components/ui/card";
import { BlogDataTypes } from "@/types";
import moment from "moment";
import Image from "next/image";
import { Fragment, useState } from "react";

export default function BlogRenderer({ posts }: { posts: BlogDataTypes[] }) {
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <Fragment>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 justify-center px-3">
        {posts.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="md:min-h-[420px] sm:min-h-[600px] mdx:min-h-[520px] smx:min-h-[400px] min-h-[300px] ronuded overflow-hidden relative my-2 ">
                <div className="  overflow-hidden  ">
                  {isImageLoaded ? (
                    <Image
                      src={post.blogThumbnail || "/logo/logo.jpeg"}
                      alt={post.blogThumbnailAuthor || "zlaam"}
                      className="rounded object-cover"
                      width={0}
                      height={0}
                      sizes="100vw"
                      style={{
                        width: "100%",
                        height: "auto",
                      }}
                    />
                  ) : (
                    <div className="absolute -translate-x-1/2 -translate-y-1/2 top-[40%] left-[50%]">
                      <ImgLoader />
                    </div>
                  )}
                </div>
                <h1 className="text-xl font-bold text-balance px-4  text-clip line-clamp-1 my-3 absolute w-full bottom-20">
                  <span>{post.blogTitle}</span>
                </h1>
                <div className="my-2 flex gap-3 items-center px-3 absolute bottom-2 w-full">
                  <Image
                    src={"/logo/logo.jpeg"}
                    width={50}
                    height={50}
                    className="rounded-full"
                    alt="zlaam"
                    onLoad={handleImageLoad}
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
