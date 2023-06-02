import React from "react";

const LoadMore = ({ setPage, page }) => {
  return (
    <button
      onClick={() => setPage(page++)}
      className="mx-auto btn btn-secondary w-fit block mb-[100px] cursor-pointer"
    >
      Load more
    </button>
  );
};

export default LoadMore;
