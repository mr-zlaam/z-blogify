"use client";

import { useTheme } from "next-themes";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  const darkModeToggle = () => {
    return setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="fixed left-3 lg:top-9 top-[43px] md:top-5 z-[999]">
      {theme === "dark" ? (
        <WiMoonAltWaxingCrescent5
          onClick={darkModeToggle}
          size={25}
          className="cursor-pointer"
        />
      ) : (
        <WiMoonAltWaxingCrescent5
          onClick={darkModeToggle}
          size={25}
          className="cursor-pointer"
        />
      )}
    </div>
  );
}
