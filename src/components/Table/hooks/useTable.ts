import usePagination from './usePagination';
import useSortTable from './useSortTable';
import { ISortParams } from './useSortTable';

interface TableHookAPI {
  initialSortValue?: ISortParams;
}

export default function useTable({ initialSortValue }: TableHookAPI) {
  const { currentPage, pageSize, onChangePage } = usePagination();
  const { filterBy, onFilter, onSort, sortBy, sortDirection } = useSortTable(initialSortValue);

  const pagination = { currentPage, pageSize };
  const sort = { sortBy, sortDirection };
  const values = { filterBy, pagination, sort };
  const table = {
    onChangePage,
    onSort,
    onFilter,
    values,
  };

  return table;
}
