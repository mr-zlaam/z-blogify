"use client";

import * as React from "react";
import { MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import { WiMoonAltWaxingCrescent5 } from "react-icons/wi";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function ThemeToggler() {
  const { setTheme, theme } = useTheme();
  const darkModeToggle = () => {
    return setTheme(theme === "dark" ? "light" : "dark");
  };
  return (
    <div className="absolute left-3 top-11">
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
