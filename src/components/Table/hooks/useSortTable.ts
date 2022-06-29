import { get, omitBy, isNull } from 'lodash';
import { useState } from 'react';

declare type IDirection = 'asc' | 'desc' | '';

export interface ISortParams {
  sortBy: string;
  sortDirection: IDirection;
}

const defaultSortDirection: IDirection = '';

const initialSort = {
  sortBy: '',
  sortDirection: defaultSortDirection,
};

export default function useSortTable(defaultSort: ISortParams = initialSort) {
  const [sortParams, setSortParams] = useState<ISortParams>(defaultSort);
  const [filter, setFilter] = useState<any>();

  const onSort = (sortValue: any) => {
    const { order, field } = sortValue;
    const convertOrder = {
      ascend: 'asc',
      descend: 'desc',
    };
    setSortParams(
      order
        ? { sortBy: field, sortDirection: get(convertOrder, order) }
        : { sortBy: '', sortDirection: '' }
    );
  };

  const onFilter = (filterValue: any) => {
    const value = omitBy(filterValue, isNull);
    setFilter(value);
  };

  const { sortBy, sortDirection } = sortParams;

  return { filterBy: filter, sortBy, sortDirection, onSort, onFilter };
}
