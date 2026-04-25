import Table from "@/components/admin/Table";
import EditableUserRow from "@/components/admin/EditableUserRow";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

type AdminUserRow = {
  id: string;
  email: string | null;
  display_name: string | null;
  plan: string | null;
  is_student: boolean | null;
  role: string | null;
  created_at: string | null;
};

export default async function UsersPage() {
  const adminClient = getAdminClient();
  const { data } = await adminClient
    .from("users")
    .select("id,email,display_name,plan,is_student,role,created_at")
    .order("created_at", { ascending: false });

  const users = (data ?? []) as AdminUserRow[];

  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6f685d]">User Registry</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">All Cedar users</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6f685d] md:text-base">
            Manage plans, roles, and student eligibility across the platform.
          </p>
        </header>

        <Table headers={["Email", "Name", "Plan", "Student", "Role", "Created", "Actions"]}>
          {users.map((user) => (
            <EditableUserRow key={user.id} user={user} />
          ))}
        </Table>
      </div>
    </div>
  );
}
