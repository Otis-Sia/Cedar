import StatCard from "@/components/admin/StatCard";
import { getAdminClient } from "@/lib/server/supabaseAdmin";

type AdminStats = {
  users: number;
  subscriptions: number;
  studentDomains: number;
  activeSubscriptions: number;
  mrr: number;
};

async function loadAdminStats(): Promise<AdminStats> {
  const adminClient = getAdminClient();
  
  const [usersResult, subscriptionsResult, studentDomainsResult, subscriptionDetailsResult] = await Promise.all([
    adminClient.from("users").select("id", { count: "exact", head: true }),
    adminClient.from("subscriptions").select("id", { count: "exact", head: true }),
    adminClient.from("student_domains").select("id", { count: "exact", head: true }),
    adminClient.from("subscriptions").select("amount,status"),
  ]);

  const subscriptions = subscriptionDetailsResult.data ?? [];
  const activeSubscriptions = subscriptions.filter((subscription) => {
    return String(subscription.status ?? "").toLowerCase() === "active";
  });

  const mrr = activeSubscriptions.reduce((total, subscription) => {
    const amount = Number(subscription.amount ?? 0);
    return total + (Number.isFinite(amount) ? amount : 0);
  }, 0);

  return {
    users: usersResult.count ?? 0,
    subscriptions: subscriptionsResult.count ?? 0,
    studentDomains: studentDomainsResult.count ?? 0,
    activeSubscriptions: activeSubscriptions.length,
    mrr,
  };
}

export default async function Dashboard() {
  const stats = await loadAdminStats();

  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6f685d]">Admin Overview</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h1 className="text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">Cedar control room</h1>
              <p className="mt-2 max-w-2xl text-sm text-[#6f685d] md:text-base">
                Monitor platform growth, revenue, and student-domain access from a single console.
              </p>
            </div>
            <div className="rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#6f685d] shadow-sm">
              Protected admin area
            </div>
          </div>
        </header>

        <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          <StatCard title="Total Users" value={stats.users} />
          <StatCard title="Subscriptions" value={stats.subscriptions} />
          <StatCard title="Student Domains" value={stats.studentDomains} />
          <StatCard title="MRR (KES)" value={stats.mrr.toLocaleString()} />
        </section>

        <section className="grid gap-6 lg:grid-cols-[1.4fr_0.9fr]">
          <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f685d]">Revenue Pulse</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-[#111111]">
              {stats.activeSubscriptions} active subscriptions contributing to MRR
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-[#6f685d]">
              Use the subscriptions view to inspect individual payment records, and keep the student whitelist current so school email signup stays automated.
            </p>
          </div>

          <div className="rounded-3xl border border-black/10 bg-[#111111] p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Quick Controls</p>
            <ul className="mt-4 space-y-3 text-sm text-white/72">
              <li>Review user roles and student flags.</li>
              <li>Confirm subscription counts and MRR changes.</li>
              <li>Maintain the approved student-domain list.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
