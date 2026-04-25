export default function StatCard({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) {
  return (
    <div className="rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
      <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f685d]">{title}</p>
      <p className="mt-4 text-3xl font-semibold tracking-tight text-[#111111]">{value}</p>
    </div>
  );
}
