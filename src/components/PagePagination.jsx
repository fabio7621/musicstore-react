const DEFAULT_PAGINATION = {
  current_page: 1,
  total_pages: 1,
  has_pre: false,
  has_next: false,
};

export default function PagePagination({ pagination, pagesChange }) {
  const safePagination = pagination || DEFAULT_PAGINATION;
  const { current_page, total_pages, has_pre, has_next } = safePagination;

  if (!pagesChange || total_pages <= 0) {
    return null;
  }

  return (
    <nav className="pages-pagination w-100 col mx-auto">
      <ul className="pagination mx-auto mt-5" style={{ width: "fit-content" }}>
        <li
          className={`page-item ${!has_pre ? "disabled" : ""}`}
          onClick={() => has_pre && pagesChange(current_page - 1)}
        >
          <button type="button" className="page-link">
            上一頁
          </button>
        </li>

        {Array.from({ length: total_pages }).map((_, index) => (
          <li
            key={index}
            className={`page-item ${current_page === index + 1 ? "active" : ""}`}
          >
            <button
              type="button"
              onClick={() => pagesChange(index + 1)}
              className="page-link"
            >
              {index + 1}
            </button>
          </li>
        ))}

        <li
          className={`page-item ${!has_next ? "disabled" : ""}`}
          onClick={() => has_next && pagesChange(current_page + 1)}
        >
          <button type="button" className="page-link">
            下一頁
          </button>
        </li>
      </ul>
    </nav>
  );
}
