"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type Subscription = {
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

export default function EditableSubscriptionRow({ subscription }: { subscription: Subscription }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    status: subscription.status ?? "active",
    amount: subscription.amount ?? 0,
    plan: subscription.plan ?? "free",
  });
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/subscriptions", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subscriptionId: subscription.id,
          ...editData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to update subscription");
      } else {
        setIsEditing(false);
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred");
    } finally {
      setIsSaving(false);
    }
  };

  const userLabel = subscription.users?.display_name || subscription.users?.email || subscription.user_id || "-";

  if (isEditing) {
    return (
      <tr className="align-top border-b border-black/5 last:border-0 bg-black/[0.01]">
        <td className="px-5 py-4 text-sm text-[#111111]">{userLabel}</td>
        <td className="px-5 py-4 text-sm">
          <input
            type="text"
            value={editData.plan}
            onChange={(e) => setEditData({ ...editData, plan: e.target.value })}
            className="w-24 rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
          />
        </td>
        <td className="px-5 py-4 text-sm">
          <select
            value={editData.status}
            onChange={(e) => setEditData({ ...editData, status: e.target.value })}
            className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
          >
            <option value="active">Active</option>
            <option value="past_due">Past Due</option>
            <option value="canceled">Canceled</option>
            <option value="incomplete">Incomplete</option>
          </select>
        </td>
        <td className="px-5 py-4 text-sm">
          <input
            type="number"
            value={editData.amount}
            onChange={(e) => setEditData({ ...editData, amount: Number(e.target.value) })}
            className="w-24 rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
          />
        </td>
        <td className="px-5 py-4 text-sm text-[#6f685d]">
          {subscription.created_at ? new Date(subscription.created_at).toLocaleDateString() : "-"}
        </td>
        <td className="px-5 py-4 text-sm space-x-2">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className="rounded-full bg-black px-3 py-1 text-xs font-semibold text-white transition-all hover:bg-black/80 disabled:opacity-50"
          >
            {isSaving ? "..." : "Save"}
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[#111111] transition-all hover:bg-black/5"
          >
            Cancel
          </button>
        </td>
      </tr>
    );
  }

  return (
    <tr className="align-top border-b border-black/5 last:border-0 hover:bg-black/[0.01] transition-colors">
      <td className="px-5 py-4 text-sm text-[#111111]">{userLabel}</td>
      <td className="px-5 py-4 text-sm text-[#111111]">{subscription.plan ?? "-"}</td>
      <td className="px-5 py-4 text-sm">
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
          subscription.status === "active" ? "bg-cedar-forest/10 text-cedar-forest" : 
          subscription.status === "canceled" ? "bg-red-100 text-red-700" : "bg-black/5 text-cedar-slate"
        }`}>
          {subscription.status ?? "-"}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-[#111111] font-mono">{subscription.amount ?? 0}</td>
      <td className="px-5 py-4 text-sm text-[#6f685d]">
        {subscription.created_at ? new Date(subscription.created_at).toLocaleDateString() : "-"}
      </td>
      <td className="px-5 py-4 text-sm">
        <button
          onClick={() => setIsEditing(true)}
          className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold text-[#111111] transition-all hover:bg-black hover:text-white"
        >
          Edit
        </button>
      </td>
    </tr>
  );
}
