"use client";

import { useEffect, useMemo, useState } from "react";
import Table from "@/components/admin/Table";

type StudentDomain = {
  id: string;
  domain: string;
  created_at: string | null;
};

function normalizeDomain(value: string) {
  return value.trim().toLowerCase();
}

export default function StudentAdmin() {
  const [domains, setDomains] = useState<StudentDomain[]>([]);
  const [newDomain, setNewDomain] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const sortedDomains = useMemo(() => domains.slice().sort((left, right) => left.domain.localeCompare(right.domain)), [domains]);

  const fetchDomains = async () => {
    setIsLoading(true);
    setErrorMessage("");

    const response = await fetch("/api/admin/students", {
      cache: "no-store",
    });
    const payload = (await response.json()) as { domains?: StudentDomain[]; error?: string };

    if (!response.ok) {
      setErrorMessage(payload.error || "Failed to load student domains.");
      setIsLoading(false);
      return;
    }

    setDomains(payload.domains ?? []);
    setIsLoading(false);
  };

  useEffect(() => {
    void fetchDomains();
  }, []);

  const addDomain = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const domain = normalizeDomain(newDomain);
    if (!domain) {
      setErrorMessage("Enter a valid domain.");
      return;
    }

    setIsSaving(true);
    setErrorMessage("");

    const response = await fetch("/api/admin/students", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ domain }),
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setErrorMessage(payload.error || "Failed to add domain.");
      setIsSaving(false);
      return;
    }

    setNewDomain("");
    await fetchDomains();
    setIsSaving(false);
  };

  const removeDomain = async (domain: string) => {
    setErrorMessage("");

    const response = await fetch(`/api/admin/students?domain=${encodeURIComponent(domain)}`, {
      method: "DELETE",
    });

    const payload = (await response.json()) as { error?: string };

    if (!response.ok) {
      setErrorMessage(payload.error || "Failed to remove domain.");
      return;
    }

    setDomains((currentDomains) => currentDomains.filter((entry) => entry.domain !== domain));
  };

  return (
    <div className="min-h-screen px-6 py-8 md:px-10 md:py-10">
      <div className="mx-auto max-w-7xl space-y-8">
        <header>
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-[#6f685d]">Student Verification</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[#111111] md:text-5xl">Domain whitelist</h1>
          <p className="mt-2 max-w-2xl text-sm text-[#6f685d] md:text-base">
            Control which school and university domains qualify for automatic student verification.
          </p>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_22rem]">
          <div className="space-y-4 rounded-3xl border border-black/10 bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#6f685d]">Whitelist</p>
                <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#111111]">Approved student domains</h2>
              </div>
              <div className="rounded-full bg-[#111111] px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {domains.length} domains
              </div>
            </div>

            {errorMessage ? (
              <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {errorMessage}
              </div>
            ) : null}

            {isLoading ? (
              <div className="rounded-2xl border border-dashed border-black/10 px-4 py-8 text-sm text-[#6f685d]">
                Loading approved domains...
              </div>
            ) : sortedDomains.length === 0 ? (
              <div className="rounded-2xl border border-dashed border-black/10 px-4 py-8 text-sm text-[#6f685d]">
                No student domains are whitelisted yet.
              </div>
            ) : (
              <Table headers={["Domain", "Added", "Action"]}>
                {sortedDomains.map((entry) => (
                  <tr key={entry.id} className="align-top">
                    <td className="px-5 py-4 text-sm text-[#111111]">{entry.domain}</td>
                    <td className="px-5 py-4 text-sm text-[#6f685d]">
                      {entry.created_at ? new Date(entry.created_at).toLocaleDateString() : "-"}
                    </td>
                    <td className="px-5 py-4 text-sm">
                      <button
                        type="button"
                        onClick={() => void removeDomain(entry.domain)}
                        className="rounded-full border border-black/10 px-4 py-2 font-semibold text-[#111111] transition-colors hover:bg-black hover:text-white"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </Table>
            )}
          </div>

          <form onSubmit={addDomain} className="h-fit rounded-3xl border border-black/10 bg-[#111111] p-6 text-white shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/55">Add domain</p>
            <h2 className="mt-2 text-2xl font-semibold tracking-tight">Register a school domain</h2>
            <p className="mt-3 text-sm leading-6 text-white/72">
              Add a domain like <span className="font-semibold text-white">uonbi.ac.ke</span> or <span className="font-semibold text-white">school.edu</span>.
            </p>

            <label className="mt-6 block text-xs font-semibold uppercase tracking-[0.2em] text-white/55" htmlFor="domain">
              Domain
            </label>
            <input
              id="domain"
              type="text"
              value={newDomain}
              onChange={(event) => setNewDomain(event.target.value)}
              placeholder="e.g. uonbi.ac.ke"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-white/8 px-4 py-3 text-sm text-white outline-none placeholder:text-white/35 focus:border-white/35"
            />

            <button
              type="submit"
              disabled={isSaving}
              className="mt-5 inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-[#111111] transition-transform hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSaving ? "Saving..." : "Add domain"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
