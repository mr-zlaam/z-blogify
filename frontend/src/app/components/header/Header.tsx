"use client";
import PageWrapper from "@/app/components/PageWrapper/PageWrapper";
import Image from "next/image";
import Link from "next/link";
import NavLinks from "./NavLinks";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

function Header() {
  const pathname = usePathname();
  const regex = /^\/projects\/.+/;
  const isTermspage = pathname === "/terms_&_conditions";
  return (
    <>
      {!regex.test(pathname) && (
        <PageWrapper
          className={cn(
            " h-[100px] flex justify-between items-center  lg:px-[70px] md:py-20 pattern_dark text-white",
            isTermspage && "hidden"
          )}
        >
          <div className="ml-5 mt-2 md:-ml-5 ">
            <Link href="/home" className="select-none">
              <Image src="/logo/image.png" alt="zlaam" width={75} height={75} />
            </Link>
          </div>
          <NavLinks />
        </PageWrapper>
      )}
    </>
  );
}

export default Header;
