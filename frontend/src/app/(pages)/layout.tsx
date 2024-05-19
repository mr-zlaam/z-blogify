import {} from "react";

import Header from "../components/header/Header";
import { ThemeToggler } from "@/theme/ThemeToggler";
function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main className="flex   flex-col  min-h-screen">
        <div className="fixed left-3 lg:top-9 top-[43px] md:top-5 z-[999]">
          <ThemeToggler />
        </div>
        <header className="z-[998] sticky top-0 ">
          <Header />
        </header>
        <section className="flex-[1] flex-grow relative z-[997]">
          {children}
        </section>
        <footer className="absolute md:fixed bottom-2 right-5 text-xs z-[996]">
          &copy; 2024 &nbsp;&nbsp;&nbsp;&nbsp;&trade;Zlaam
        </footer>
      </main>
    </>
  );
}

export default Layout;
