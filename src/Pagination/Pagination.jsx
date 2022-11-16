const Pagination = ({
  totalPosts,
  itemsPerPage,
  setCurrentPage,
  currentPage,
}) => {
  const pages = [];

  for (let i = 1; i <= Math.ceil(totalPosts / itemsPerPage); i++) {
    pages.push(i);
  }

  console.log(totalPosts);
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
