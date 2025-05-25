/** @format */

import styled from "styled-components";

const PaginationWrapper = styled.div`
  width: 100%;
  min-height: 10vh;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  .current {
    font-weight: bolder;
    border: 2px solid #333333;
    padding: 2px 10px;
    border-radius: 4px;
  }
`;

type textValue = {
  statement: string;
  reply: string;
};

type Post = {
  id: string;
  authorId?: string;
  userValue: textValue;
  postType: string;
  imageUrl: string;
};

type PaginationProps = {
  currentPage: number;
  setCurrentPage: (value: number) => void;
  itemsPerPage: number;
  pageChange: number;
  posts: Post[];
};

export const Pagination = ({
  currentPage,
  setCurrentPage,
  itemsPerPage,
  posts,
}: PaginationProps) => {
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <PaginationWrapper className="text-center">
      <div className="hidden sm:block">
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <p>Page</p>
          <p className="current">{currentPage}</p>
          <p> of</p>
          <p>{totalPages}</p>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
      <div className="block sm:hidden">
        <div className="flex gap-4 items-center justify-center mb-4">
          <p>Page</p>
          <p className="current">{currentPage}</p>
          <p> of</p>
          <p>{totalPages}</p>
        </div>
        <div className="flex gap-4 items-center justify-center">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}>
            Previous
          </button>
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}>
            Next
          </button>
        </div>
      </div>
    </PaginationWrapper>
  );
};
