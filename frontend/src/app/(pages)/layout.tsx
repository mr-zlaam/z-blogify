import {} from "react";

import Header from "../components/header/Header";
import { ThemeToggler } from "@/theme/ThemeToggler";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex   flex-col  min-h-screen">
        <div className="md:fixed md:left-3 lg:top-9 top-[43px] md:top-5 z-[999] m-4">
          <ThemeToggler />
        </div>
        <header className="z-[998] sticky top-0 ">{/* <Header /> */}</header>
        <section className="flex-[1] flex-grow relative z-[997]">
          {children}
        </section>
        {/* <footer className="relative w-full mx-10 my-10 md:fixed bottom-2 right-5 text-xs z-[996]">
          &copy; 2024 &nbsp;&nbsp;&nbsp;&nbsp;&trade;Zlaam
        </footer> */}
      </main>
    </>
  );
}

export default Layout;
