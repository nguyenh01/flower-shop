import { TableProps as AntTableProps } from 'antd';
import { findIndex } from 'lodash';
import React, { useMemo } from 'react';
import styled from 'styled-components';
import { FilterDefaultIcon, FilterVariantIcon } from '../Icons';
import TablePagination from '../Pagination/TablePagination';
import useTable from './hooks/useTable';
import { StyledTable } from './style';
import { LoadingOutlined } from '@ant-design/icons';

declare type IDirection = 'asc' | 'desc' | '';

declare type SortOrder = 'descend' | 'ascend' | null;

interface TableInstanceProps {
  values: {
    pagination: {
      currentPage: number;
      pageSize: number;
    };
    sort: {
      sortBy?: string;
      sortDirection?: IDirection;
    };
  };
  onChangePage: (page: number, pageSize?: number) => void;
  onSort?: (sort: any) => void;
  onFilter?: (filter: any) => void;
}

export interface TableProps<T> extends AntTableProps<T> {
  totalItems: number;
  tableInstance: TableInstanceProps;
  prevIcon?: any;
  nextIcon?: any;
  showPagination?: boolean;
  loading: boolean;
}

const antIcon = <LoadingOutlined style={{ fontSize: 40 }} spin />;

const Table = ({
  tableInstance,
  onChange,
  columns,
  totalItems,
  showPagination = true,
  loading,
  ...props
}: TableProps<any>) => {
  const {
    values: {
      pagination: { currentPage, pageSize },
      sort: { sortBy, sortDirection },
    },
    onChangePage,
    onSort,
    onFilter,
  } = tableInstance;

  const handleChange = (pagination: any, filter: any, sort: any, extra: any) => {
    onChange && onChange(pagination, filter, sort, extra);
    onChangePage(1);
    onSort && onSort(sort);
    onFilter && onFilter(filter);
  };

  const convertColumns = useMemo(() => {
    if (!columns) return;
    const newColumn = [...columns];
    if (sortDirection && sortBy) {
      const columnIndex = findIndex(columns, { dataIndex: sortBy });
      if (columnIndex !== -1) {
        const convertOrder: { asc: SortOrder; desc: SortOrder } = {
          asc: 'ascend',
          desc: 'descend',
        };
        newColumn[columnIndex].defaultSortOrder = convertOrder[sortDirection];
      }
    }
    newColumn.forEach((item) => {
      item.filterIcon = (filtered: boolean) => {
        if (filtered) {
          return <FilterVariantIcon />;
        } else return <FilterDefaultIcon />;
      };
    });
    return newColumn;
  }, [columns, sortBy, sortDirection]);

  return (
    <Container>
      <StyledTable
        {...props}
        onChange={handleChange}
        pagination={{ pageSize }}
        columns={columns ? convertColumns : undefined}
        showSorterTooltip={false}
        loading={loading && { indicator: antIcon }}
      />
      {showPagination && (
        <TablePagination
          currentPage={currentPage}
          totalItems={totalItems}
          pageSize={pageSize}
          onChange={onChangePage}
        />
      )}
    </Container>
  );
};

Table.defaultProps = {
  sortDirections: ['ascend', 'descend', 'ascend'],
};

Table.useTable = useTable;

const Container = styled.div``;

export default Table;
