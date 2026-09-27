"use client";

import { useRole } from "@/context/RoleContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Rocket, Layers, Cpu } from "lucide-react";

const roles = [
  { id: "ai-engineer", label: "AI Engineer", shortLabel: "AI", icon: Sparkles },
  { id: "forward-deployed-engineer", label: "Forward Deployed", shortLabel: "FDE", icon: Rocket },
  { id: "full-stack-engineer", label: "Full Stack", shortLabel: "Full Stack", icon: Layers },
  { id: "solutions-engineer", label: "Solutions Engineer", shortLabel: "Solutions", icon: Cpu },
];

export function RoleSwitcher() {
  const { activeRole, setActiveRole } = useRole();

  return (
    <div className="flex items-center gap-1 sm:gap-2 p-1.5 bg-background/80 backdrop-blur-md rounded-full border shadow-sm">
      <span className="hidden md:inline-flex items-center text-xs font-semibold text-muted-foreground pl-3 pr-1">
        Focus:
      </span>
      {roles.map((role) => {
        const isActive = activeRole === role.id;
        const Icon = role.icon;
        return (
          <button
            key={role.id}
            onClick={() => setActiveRole(role.id)}
            className={cn(
              "relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium rounded-full transition-all duration-200",
              isActive ? "text-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            )}
          >
            {isActive && (
              <motion.div
                layoutId="activeRolePill"
                className="absolute inset-0 bg-background shadow-sm rounded-full -z-10 border border-primary/30"
                transition={{ type: "spring", stiffness: 350, damping: 30 }}
              />
            )}
            <Icon className={cn("h-3.5 w-3.5", isActive ? "text-primary animate-pulse" : "text-muted-foreground")} />
            <span className="hidden sm:inline">{role.label}</span>
            <span className="sm:hidden">{role.shortLabel}</span>
          </button>
        );
      })}
    </div>
  );
}
