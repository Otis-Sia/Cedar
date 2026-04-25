import React from "react";

type TableProps = {
  headers: string[];
  children: React.ReactNode;
};

export default function Table({ headers, children }: TableProps) {
  return (
    <div className="overflow-hidden rounded-3xl border border-black/10 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-black/5">
          <thead className="bg-black/[0.02]">
            <tr className="text-left">
              {headers.map((header) => (
                <th key={header} className="px-5 py-4 text-xs font-semibold uppercase tracking-[0.2em] text-[#6f685d]">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5 bg-white">{children}</tbody>
        </table>
      </div>
    </div>
  );
}
