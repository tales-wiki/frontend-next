import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
}: PaginationProps) {
  const pages = Array.from({ length: totalPages }, (_, i) => i);
  const maxVisiblePages = 5;
  const startPage = Math.max(
    0,
    Math.min(currentPage - 2, totalPages - maxVisiblePages)
  );
  const visiblePages = pages.slice(startPage, startPage + maxVisiblePages);

  return (
    <div className="flex items-center justify-center w-[400px] mx-auto">
      <div className="flex items-center gap-4">
        <Link
          href={`${basePath}?page=${currentPage - 1}`}
          className={`text-gray-600 hover:text-gray-900 ${
            currentPage === 0 ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <ChevronLeft className="h-4 w-4" />
        </Link>

        {startPage > 0 && (
          <>
            <Link
              href={`${basePath}?page=0`}
              className="text-gray-600 hover:text-gray-900"
            >
              1
            </Link>
            {startPage > 1 && <span className="text-gray-400">...</span>}
          </>
        )}

        {visiblePages.map((page) => (
          <Link
            key={page}
            href={`${basePath}?page=${page}`}
            className={`${
              currentPage === page
                ? "text-blue-500 font-medium"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            {page + 1}
          </Link>
        ))}

        {startPage + maxVisiblePages < totalPages && (
          <>
            {startPage + maxVisiblePages < totalPages - 1 && (
              <span className="text-gray-400">...</span>
            )}
            <Link
              href={`${basePath}?page=${totalPages - 1}`}
              className="text-gray-600 hover:text-gray-900"
            >
              {totalPages}
            </Link>
          </>
        )}

        <Link
          href={`${basePath}?page=${currentPage + 1}`}
          className={`text-gray-600 hover:text-gray-900 ${
            currentPage === totalPages - 1
              ? "pointer-events-none opacity-50"
              : ""
          }`}
        >
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
