"use client";
import { useActivePath } from "@/app/helper/checkActivePath/CheckActivePath";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Fragment } from "react";
import { navLinks } from "./components/NavLinks";

function NavBar() {
  const isActivePath = useActivePath();

  return (
    <>
      <div className="w-full flex items-center gap-4 my-4  overflow-x-auto overflow-y-hidden">
        {navLinks.map((data) => (
          <Fragment key={data.name}>
            <Button
              variant={data.variant}
              className={cn(
                isActivePath(data.path) &&
                  "bg-foreground text-background duration-300 ",
                data.className
              )}
            >
              <Link href={data.path}>{data.name}</Link>
            </Button>
          </Fragment>
        ))}
      </div>
    </>
  );
}

export default NavBar;
