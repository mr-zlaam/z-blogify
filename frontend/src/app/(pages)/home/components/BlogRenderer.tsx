"use client";
import { Card } from "@/components/ui/card";
import { PublicBLogTypes } from "@/types";
import { Fragment } from "react";

export default function BlogRenderer({ data }: { data: PublicBLogTypes }) {
  const { data: latestPosts } = data!;
  if (!data.success) return;
  return (
    <Fragment>
      <div className="grid grid-cols-2 gap-4">
        {latestPosts.publicBlogsList.map((post) => {
          return (
            <Fragment key={post._id}>
              <Card className="min-h-[40dvh]">hello</Card>
            </Fragment>
          );
        })}
      </div>
    </Fragment>
  );
}
