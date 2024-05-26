"use client";
import { useActivePath } from "@/app/helper/checkActivePath/CheckActivePath";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import {} from "react";

function NavBar() {
  const isActivePath = useActivePath();
  return (
    <>
      <div className="w-full flex items-center gap-4 my-4  overflow-x-auto overflow-y-hidden">
        <Button
          variant={"outline"}
          className={cn(
            isActivePath("/home") &&
              "bg-foreground text-background duration-300 ",
            "border border-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          )}
        >
          <Link href={"#"}>
            <span className="">Latest Posts</span>
          </Link>
        </Button>
        {/* <div className="h-8 w-1 rounded bg-foreground inline-block" /> */}
        <Button
          variant={"outline"}
          className={cn(
            isActivePath("/allPosts") && "bg-foreground text-background",
            "border border-foreground transition-all duration-300 hover:bg-foreground hover:text-background"
          )}
        >
          <Link href={"#"}>
            <span className="">All Posts</span>
          </Link>
        </Button>
      </div>
    </>
  );
}

export default NavBar;
