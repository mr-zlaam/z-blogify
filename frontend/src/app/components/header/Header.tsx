"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";

function Header() {
  return (
    <>
      <PageWrapper
        className={cn(
          " h-[100px] flex justify-between items-center  lg:px-[70px] md:py-20"
        )}
      >
        <div className="ml-5 mt-2 md:-ml-5 ">
          <Link href="/home" className="select-none">
            logo
          </Link>
        </div>
        <NavLinks />
      </PageWrapper>
    </>
  );
}

export default Header;
