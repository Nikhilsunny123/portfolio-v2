"use client";

import { ThemeProvider } from "next-themes";
import { RoleProvider } from "@/context/RoleContext";
import { CommandPaletteProvider } from "@/context/CommandPaletteContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
      <RoleProvider>
        <CommandPaletteProvider>
          {children}
        </CommandPaletteProvider>
      </RoleProvider>
    </ThemeProvider>
  );
}
