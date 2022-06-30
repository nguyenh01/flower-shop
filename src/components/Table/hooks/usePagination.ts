import { useState } from 'react';

const DEFAULT_PAGE_SIZE = 4;
const initState = { currentPage: 1, pageSize: DEFAULT_PAGE_SIZE };

export default function usePagination() {
  const [pagination, setPagination] = useState(initState);

  const onChangePage = (page: number, pageSize?: number) => {
    setPagination((prevState) => ({
      ...prevState,
      currentPage: page,
    }));
    if (pageSize) {
      setPagination((prevState) => ({
        ...prevState,
        pageSize,
      }));
    }
  };

  const { currentPage, pageSize } = pagination;
  return { currentPage, pageSize, onChangePage };
}
