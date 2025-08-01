"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  AppLogo
} from "@/components/icons";
import {
  BarChart2,
  Bike,
  ClipboardPlus,
  Home,
  LogOut,
  Settings,
  Target,
  Users,
  FileText
} from "lucide-react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { logout } from "@/lib/actions";
import type { UserRole } from "@/lib/types";

const adminNavLinks = [
  { href: "/admin/dashboard", icon: Home, label: "Dashboard" },
  { href: "/admin/riders", icon: Users, label: "Riders" },
  { href: "/admin/deliveries", icon: Bike, label: "Deliveries" },
  { href: "/admin/training", icon: Target, label: "AI Coach" },
  { href: "/admin/reports", icon: BarChart2, label: "Reports" },
];

const riderNavLinks = [
  { href: "/rider/dashboard", icon: Home, label: "Dashboard" },
  { href: "/rider/training", icon: Target, label: "Training Plan" },
];

const dataEntryNavLinks = [
  { href: "/data-entry/dashboard", icon: Home, label: "Dashboard" },
  { href: "/data-entry/new", icon: ClipboardPlus, label: "New Entry" },
];

const navLinksMap = {
  admin: adminNavLinks,
  rider: riderNavLinks,
  "data-entry": dataEntryNavLinks,
};

export function AppSidebar({ role }: { role: UserRole }) {
  const pathname = usePathname();
  const navLinks = navLinksMap[role];

  return (
    <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-card sm:flex">
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href={`/${role}/dashboard`}
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <AppLogo className="h-5 w-5 transition-all group-hover:scale-110" />
          <span className="sr-only">RiderPerformance</span>
        </Link>
        <TooltipProvider>
          {navLinks.map((link) => (
            <Tooltip key={link.href}>
              <TooltipTrigger asChild>
                <Link
                  href={link.href}
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-lg transition-colors md:h-8 md:w-8",
                    pathname.startsWith(link.href)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <link.icon className="h-5 w-5" />
                  <span className="sr-only">{link.label}</span>
                </Link>
              </TooltipTrigger>
              <TooltipContent side="right">{link.label}</TooltipContent>
            </Tooltip>
          ))}
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <form action={logout}>
                    <button type="submit" className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8">
                        <LogOut className="h-5 w-5" />
                        <span className="sr-only">Logout</span>
                    </button>
                </form>
              </TooltipTrigger>
              <TooltipContent side="right">Logout</TooltipContent>
            </Tooltip>
        </TooltipProvider>
      </nav>
    </aside>
  );
}
