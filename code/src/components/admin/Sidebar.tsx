"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, BadgeDollarSign, School } from "lucide-react";

const navigation = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/users", label: "Users", icon: Users },
  { href: "/admin/subscriptions", label: "Subscriptions", icon: BadgeDollarSign },
  { href: "/admin/students", label: "Student Verification", icon: School },
];

export default function Sidebar({ userRole }: { userRole?: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden min-h-screen border-r border-black/10 bg-[#111111] px-5 py-6 text-white lg:flex lg:flex-col">
      <div className="mb-10">
        <p className="text-[11px] uppercase tracking-[0.35em] text-white/45">Cedar Admin</p>
        <h1 className="mt-3 text-2xl font-semibold tracking-tight">Operations Console</h1>
        <p className="mt-2 text-sm text-white/60">Signed in as {userRole || "user"}</p>
      </div>

      <nav className="space-y-2">
        {navigation.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-white text-[#111111]"
                  : "text-white/72 hover:bg-white/8 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-white/68">
        Manage users, subscriptions, and the student-domain whitelist from one place.
      </div>
    </aside>
  );
}
