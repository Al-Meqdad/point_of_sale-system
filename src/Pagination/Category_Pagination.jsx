import { useEffect } from "react";

const Pagination = ({
  totalPosts,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  query,
}) => {
  let length_after_filter = totalPosts.length;

  if (query.length >= 1) {
    length_after_filter = totalPosts.filter((p) =>
      p.category.toLowerCase().includes(query.toLowerCase())
    ).length;
  }
  const pages = [];
  for (let i = 1; i <= Math.ceil(length_after_filter / itemsPerPage); i++) {
    pages.push(i);
  }
  useEffect(() => {
    if (length_after_filter < totalPosts.length) {
      setCurrentPage(1);
    }
  }, [totalPosts, length_after_filter, setCurrentPage, query]);

  return (
    <div className="Pagination_container">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={(event) => setCurrentPage(page)}
          className={page === currentPage ? "page_btn active" : "page_btn"}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
