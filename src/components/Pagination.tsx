interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  maxVisible?: number; // opcional: quantos botões mostrar
}

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
  maxVisible = 5,
}: PaginationProps) => {
  const half = Math.floor(maxVisible / 2);
  let start = Math.max(currentPage - half, 0);
  let end = start + maxVisible - 1;

  if (end >= totalPages) {
    end = totalPages - 1;
    start = Math.max(end - maxVisible + 1, 0);
  }

  const pages = Array.from({ length: end - start + 1 }, (_, i) => start + i);

  return (
    <div className="flex flex-wrap gap-2 mt-4 justify-center">
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 0))}
        disabled={currentPage === 0}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        {"<"}
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"
          }`}
        >
          {page + 1}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages - 1))}
        disabled={currentPage === totalPages - 1}
        className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50"
      >
        {">"}
      </button>
    </div>
  );
};

export default Pagination;
