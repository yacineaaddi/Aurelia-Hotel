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
    <div className="Pagination">
      <button
        disabled={currentPage === 1}
        onClick={() => goToPage(currentPage - 1)}
        className="Pagination-button"
      >
        Previous
      </button>

      <span>
        Page {currentPage} of {totalPages}
      </span>

      <button
        disabled={currentPage === totalPages}
        onClick={() => goToPage(currentPage + 1)}
        className="Pagination-button"
      >
        Next
      </button>
    </div>
  );
}
