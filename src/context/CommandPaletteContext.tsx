"use client";

import { createContext, useContext, useState, ReactNode } from "react";
import { CommandPalette } from "@/components/CommandPalette";

interface CommandPaletteContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  openPalette: () => void;
  closePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType>({
  isOpen: false,
  setIsOpen: () => {},
  openPalette: () => {},
  closePalette: () => {},
});

export function CommandPaletteProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openPalette = () => setIsOpen(true);
  const closePalette = () => setIsOpen(false);

  return (
    <CommandPaletteContext.Provider value={{ isOpen, setIsOpen, openPalette, closePalette }}>
      {children}
      <CommandPalette isOpen={isOpen} setIsOpen={setIsOpen} />
    </CommandPaletteContext.Provider>
  );
}

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}
