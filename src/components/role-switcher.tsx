"use client";

import { useRole } from "@/context/RoleContext";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Sparkles, Rocket, Layers, Cpu } from "lucide-react";

const roles = [
  { id: "ai-engineer", label: "AI Systems", shortLabel: "AI", icon: Sparkles },
  { id: "forward-deployed-engineer", label: "Forward Deployed", shortLabel: "FDE", icon: Rocket },
  { id: "full-stack-engineer", label: "Full Stack", shortLabel: "Full Stack", icon: Layers },
  { id: "solutions-engineer", label: "Solutions", shortLabel: "Solutions", icon: Cpu },
];

export function RoleSwitcher() {
  const { activeRole, setActiveRole } = useRole();

  return (
    <div className="relative max-w-full">
      <div className="flex max-w-full overflow-x-auto scrollbar-none items-center gap-1 sm:gap-1.5 p-1 sm:p-1.5 bg-[#07090e]/85 backdrop-blur-xl rounded-full border border-white/10 shadow-[0_4px_24px_rgba(0,0,0,0.4)]">
        <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono font-medium text-muted-foreground/80 pl-3 pr-1 select-none">
          <span className="h-1.5 w-1.5 rounded-full bg-primary" />
          Lens:
        </span>
        {roles.map((role) => {
          const isActive = activeRole === role.id;
          const Icon = role.icon;
          return (
            <motion.button
              key={role.id}
              onClick={() => setActiveRole(role.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={cn(
                "relative flex shrink-0 items-center gap-1.5 px-3 sm:px-3.5 py-1.5 text-xs font-medium rounded-full transition-colors duration-200 select-none",
                isActive
                  ? "text-white font-semibold"
                  : "text-muted-foreground hover:text-white hover:bg-white/[0.04]"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeRolePill"
                  className="absolute inset-0 bg-white/[0.08] shadow-sm rounded-full -z-10 border border-white/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon
                className={cn(
                  "h-3.5 w-3.5 shrink-0 transition-colors",
                  isActive ? "text-primary" : "text-muted-foreground"
                )}
              />
              <span className="hidden sm:inline">{role.label}</span>
              <span className="sm:hidden text-[11px]">{role.shortLabel}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
