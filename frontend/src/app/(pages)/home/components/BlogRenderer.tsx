"use client";
import { Card } from "@/components/ui/card";
import { PublicBLogTypes } from "@/types";
import Image from "next/image";
import { Fragment } from "react";

export default function BlogRenderer({ data }: { data: PublicBLogTypes }) {
  const { data: latestPosts } = data!;
  if (!data.success) return;
  return (
    <Fragment>
      <div className="grid grid-cols-3 gap-4">
        {latestPosts.publicBlogsList.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="min-h-[50dvh] ronuded overflow-hidden">
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
                <h1 className="text-xl font-bold text-balance px-4">
                  {post.blogTitle}
                </h1>
              </Card>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
