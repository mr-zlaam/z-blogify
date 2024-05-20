"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import { cn } from "@/lib/utils";
import Link from "next/link";
import NavLinks from "./NavLinks";
import Image from "next/image";
import { useTheme } from "next-themes";

function Header() {
  const { theme } = useTheme();
  return (
    <>
      <PageWrapper
        className={cn(
          " h-[100px] flex justify-between items-center  lg:px-[70px]  sticky top-0 bg-background"
        )}
      >
        <div className="ml-5 mt-2 md:-ml-5 ">
          <Link href="/home" className="select-none">
            <Image
              src={"/logo/logo.png"}
              alt="zlaam.dev"
              height={70}
              width={70}
              className={cn(theme === "dark" ? "invert" : "")}
            />
          </Link>
        </div>
        <NavLinks />
      </PageWrapper>
    </>
  );
}

export default Header;
