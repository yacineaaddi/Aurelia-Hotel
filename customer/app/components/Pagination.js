"use client";

import { useRouter, useSearchParams } from "next/navigation";

export default function Pagination({ currentPage, totalPages, filter }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function goToPage(page) {
    const params = new URLSearchParams(searchParams.toString());

    params.set("page", String(page));

    if (filter) {
      params.set("filter", filter);
    }

    router.push(`?${params.toString()}`, {
      scroll: true,
    });
  }

  if (totalPages <= 1) return null;

  return (
    <div className="mt-10 flex items-center justify-center gap-4">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="text-primary-800 rounded-xl px-4 py-2 disabled:opacity-40 bg-accent-600"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="text-primary-800 rounded-xl px-4 py-2 disabled:opacity-40 bg-accent-600"
      >
        Next
      </button>
    </div>
  );
}
