"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { resumesData, ResumeData } from "@/data/resumes";

type RoleContextType = {
  activeRole: string;
  setActiveRole: (role: string) => void;
  activeResume: ResumeData;
};

const RoleContext = createContext<RoleContextType | undefined>(undefined);

export function RoleProvider({ children }: { children: React.ReactNode }) {
  const [activeRole, setActiveRole] = useState("full-stack-engineer");
  
  const activeResume = resumesData[activeRole] || resumesData["full-stack-engineer"];

  return (
    <RoleContext.Provider value={{ activeRole, setActiveRole, activeResume }}>
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (context === undefined) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
