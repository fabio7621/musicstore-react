export default function PagePagination({ pagination, pagesChange }) {
  return (
    <>
      <nav className="pages-pagination w-100 col mx-auto">
        <ul
          className="pagination mx-auto mt-5"
          style={{ width: "fit-content" }}
        >
          <li
            className={`page-item ${!pagination.has_pre && "disabled"}`}
            onClick={() => pagesChange(pagination.current_page - 1)}
          >
            <button className="page-link">上一頁</button>
          </li>

          {Array.from({ length: pagination.total_pages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${
                pagination.current_page === index + 1 ? "active" : ""
              }`}
            >
              <button
                onClick={() => pagesChange(index + 1)}
                className="page-link"
              >
                {index + 1}
              </button>
            </li>
          ))}

          <li
            className={`page-item ${!pagination.has_next && "disabled"}`}
            onClick={() => pagesChange(pagination.current_page + 1)}
          >
            <button className="page-link">下一頁</button>
          </li>
        </ul>
      </nav>
    </>
  );
}
