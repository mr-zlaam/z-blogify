"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <>
      <PageWrapper
        className={cn(
          " h-[100px] flex justify-between items-center  lg:px-[70px]  sticky top-0 bg-background"
        )}
      >
        <div className="ml-5 mt-2 md:-ml-5 ">
          <Link href="/" className="select-none">
            logo
          </Link>
        </div>
        <NavLinks />
      </PageWrapper>
    </>
  );
}

export default Header;
