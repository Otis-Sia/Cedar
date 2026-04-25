"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RoleToggleButton({
  userId,
  currentRole,
}: {
  userId: string;
  currentRole: string;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleToggle = async () => {
    const newRole = currentRole === "admin" ? "user" : "admin";
    const confirmMessage =
      newRole === "admin"
        ? "Promote this user to admin? They will have full access to this console."
        : "Demote this user to regular user?";

    if (!confirm(confirmMessage)) return;

    setIsUpdating(true);

    try {
      const response = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, role: newRole }),
      });

      if (!response.ok) {
        const data = await response.json();
        alert(data.error || "Failed to update role");
      } else {
        router.refresh();
      }
    } catch (err) {
      console.error(err);
      alert("An error occurred while updating the role");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <button
      onClick={handleToggle}
      disabled={isUpdating}
      className={`rounded-full border px-3 py-1 text-xs font-semibold transition-all hover:-translate-y-0.5 disabled:opacity-50 ${
        currentRole === "admin"
          ? "border-red-200 bg-red-50 text-red-700 hover:bg-red-100"
          : "border-black/10 bg-white text-[#111111] hover:bg-black hover:text-white"
      }`}
    >
      {isUpdating ? "..." : currentRole === "admin" ? "Demote" : "Promote"}
    </button>
  );
}
