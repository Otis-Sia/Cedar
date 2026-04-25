import { ReactNode } from "react";
import Sidebar from "@/components/admin/Sidebar";
import { requireAdminSession } from "@/lib/adminGuard";

export default async function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const sessionUser = await requireAdminSession();

  return (
    <div className="min-h-screen bg-[#f3efe7] text-[#111111] lg:grid lg:grid-cols-[18rem_minmax(0,1fr)]">
      <Sidebar userRole={sessionUser.role} />
      <main className="min-w-0">{children}</main>
    </div>
  );
}
