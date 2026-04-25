import Table from "@/components/admin/Table";
import EditableSubscriptionRow from "@/components/admin/EditableSubscriptionRow";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

type SubscriptionRow = {
  id: string;
  plan: string | null;
  status: string | null;
  amount: number | null;
  created_at: string | null;
  user_id: string | null;
  users?: {
    email?: string | null;
    display_name?: string | null;
  } | null;
};

export default async function SubsPage() {
  const adminClient = getAdminClient();
  const { data } = await adminClient
    .from("subscriptions")
    .select("id,plan,status,amount,created_at,user_id,users:users(email, display_name)")
    .order("created_at", { ascending: false });

  const subscriptions = (data ?? []) as SubscriptionRow[];

  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6f685d]">Billing Ledger</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">Subscriptions</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6f685d] md:text-base">
            Track and manage plan statuses and payment values for every account.
          </p>
        </header>

        <Table headers={["User", "Plan", "Status", "Amount", "Created", "Actions"]}>
          {subscriptions.map((subscription) => (
            <EditableSubscriptionRow key={subscription.id} subscription={subscription} />
          ))}
        </Table>
      </div>
    </div>
  );
}
