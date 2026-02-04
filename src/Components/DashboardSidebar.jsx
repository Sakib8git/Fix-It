"use client";

import { useState } from "react";
import {
  Wrench,
  Home,
  Inbox,
  Users,
  Settings,
  ClipboardCheck,
  History,
  PlusCircle,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";

import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";

const navGroups = [
  {
    label: "General",
    items: [{ icon: Home, label: "Dashboard Overview", href: "/dashboard" }],
  },
  {
    label: "Admin Views",
    items: [
      { icon: Inbox, label: "All Tickets", href: "/dashboard/tickets" },
      { icon: Users, label: "Manage Users", href: "/dashboard/users" },
      {
        icon: Settings,
        label: "Service Settings",
        href: "/dashboard/settings",
      },
    ],
  },
  {
    label: "Technician Views",
    items: [
      {
        icon: ClipboardCheck,
        label: "My Assigned Tasks",
        href: "/dashboard/tasks",
      },
    ],
  },
  {
    label: "Customer Views",
    items: [
      { icon: History, label: "My Repair History", href: "/dashboard/history" },
      {
        icon: PlusCircle,
        label: "Create New Request",
        href: "/dashboard/new-request",
      },
    ],
  },
];

function SidebarContent() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full bg-card border-r border-border">
      {/* Brand */}
      <div className="p-6 border-b border-border">
        <Link
          href="/"
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="flex items-center justify-center rounded-lg bg-primary p-2">
            <Wrench className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-foreground">FixIt Pro</span>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4">
        {navGroups.map((group, idx) => (
          <div key={idx} className="mb-8">
            <h3 className="px-4 mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {group.label}
            </h3>
            <div className="space-y-2">
              {group.items.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link key={item.href} href={item.href}>
                    <Button
                      variant={isActive ? "default" : "ghost"}
                      className={`w-full justify-start gap-3 ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "text-foreground hover:bg-muted"
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </Button>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </div>
  );
}

export function DashboardSidebar() {
  return (
    <div className="hidden md:block w-64 bg-card border-r border-border">
      <SidebarContent />
    </div>
  );
}

export function DashboardSidebarMobile() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SidebarContent />
      </SheetContent>
    </Sheet>
  );
}
