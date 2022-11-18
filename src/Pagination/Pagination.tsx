import { useEffect, FunctionComponent } from "react";
import { ProductsApi } from "../ApiRespones";

interface PageProps {
  totalPosts: ProductsApi[];
  itemsPerPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  defaultCategory: string[] | string;
  query: string;
}

const Pagination: FunctionComponent<PageProps> = ({
  totalPosts,
  itemsPerPage,
  setCurrentPage,
  currentPage,
  query,
  defaultCategory,
}) => {
  let length_after_filter: number = totalPosts.filter((p) =>
    defaultCategory.includes(p.category)
  ).length;

  if (query.length >= 1) {
    length_after_filter = totalPosts.filter((p) =>
      p.name.toLowerCase().includes(query.toLowerCase())
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
  }, [setCurrentPage, length_after_filter, totalPosts]);

  return (
    <div className="Pagination_container">
      {pages.map((page, index) => (
        <button
          key={index}
          onClick={() => setCurrentPage(page)}
          className={page === currentPage ? "page_btn active" : "page_btn"}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
