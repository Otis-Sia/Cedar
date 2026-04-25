"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  email: string | null;
  display_name: string | null;
  plan: string | null;
  is_student: boolean | null;
  role: string | null;
  created_at: string | null;
};

export default function EditableUserRow({ user }: { user: User }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [editData, setEditData] = useState({
    plan: user.plan ?? "free",
    is_student: user.is_student ?? false,
    role: user.role ?? "user",
  });
  const router = useRouter();

  const handleSave = async () => {
    setIsSaving(true);
    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user.id,
          ...editData,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to update user");
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

  if (isEditing) {
    return (
      <tr className="align-top border-b border-black/5 last:border-0 bg-black/[0.01]">
        <td className="px-5 py-4 text-sm text-[#111111]">{user.email ?? "-"}</td>
        <td className="px-5 py-4 text-sm text-[#111111]">{user.display_name ?? "-"}</td>
        <td className="px-5 py-4 text-sm">
          <select
            value={editData.plan}
            onChange={(e) => setEditData({ ...editData, plan: e.target.value })}
            className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
          >
            <option value="free">Free</option>
            <option value="student">Student</option>
            <option value="pro">Pro</option>
          </select>
        </td>
        <td className="px-5 py-4 text-sm">
          <input
            type="checkbox"
            checked={editData.is_student}
            onChange={(e) => setEditData({ ...editData, is_student: e.target.checked })}
            className="rounded border-black/10"
          />
        </td>
        <td className="px-5 py-4 text-sm">
          <select
            value={editData.role}
            onChange={(e) => setEditData({ ...editData, role: e.target.value })}
            className="rounded-lg border border-black/10 bg-white px-2 py-1 text-xs"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </td>
        <td className="px-5 py-4 text-sm text-[#6f685d]">
          {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
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
      <td className="px-5 py-4 text-sm text-[#111111]">{user.email ?? "-"}</td>
      <td className="px-5 py-4 text-sm text-[#111111]">{user.display_name ?? "-"}</td>
      <td className="px-5 py-4 text-sm">
        <span className={`rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
          user.plan === "student" ? "bg-cedar-bronze/10 text-cedar-bronze" : 
          user.plan === "pro" ? "bg-cedar-forest/10 text-cedar-forest" : "bg-black/5 text-cedar-slate"
        }`}>
          {user.plan ?? "free"}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-[#111111]">{user.is_student ? "Yes" : "No"}</td>
      <td className="px-5 py-4 text-sm">
        <span className={`font-medium ${user.role === "admin" ? "text-cedar-forest font-bold" : "text-[#111111]"}`}>
          {user.role ?? "user"}
        </span>
      </td>
      <td className="px-5 py-4 text-sm text-[#6f685d]">
        {user.created_at ? new Date(user.created_at).toLocaleDateString() : "-"}
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
