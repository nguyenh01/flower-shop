import styled from 'styled-components';
import { Table } from 'antd';

export const StyledTable = styled(Table)`
  .ant-table-tbody > tr > td {
    border-bottom: 1px solid #ebedf3;
  }

  th.ant-table-cell {
    background-color: ${(props) => props.theme.colors.blue};
    color: #fff;
    font-weight: 700;

    &:hover {
      background-color: ${(props) => props.theme.colors.blue} !important;
    }
  }

  .ant-table-thead th.ant-table-column-sort::before {
    background-color: #ffffff4a !important;
  }

  .ant-table-thead
    > tr
    > th:not(:last-child):not(.ant-table-selection-column):not(.ant-table-row-expand-icon-cell):not([colspan])::before {
    background-color: #ffffff4a !important;
  }

  tr:nth-child(even) td.ant-table-cell {
    background-color: #e9ebf5;
  }
  tr:nth-child(odd) td.ant-table-cell {
    background-color: #cfd5ea;
  }

  th.ant-table-cell {
    text-transform: uppercase;
  }

  .ant-pagination-total-text {
    flex: 1 0 0;
  }

  .ant-table-column-sorter,
  .ant-table-column-sorter-inner {
    display: flex;
    flex-direction: column;
  }

  .ant-table-column-sorter-up,
  .ant-table-column-sorter-down {
    svg {
      display: none;
    }
  }

  .ant-table-column-sorter-down {
    width: 9px;
    height: 16px;
    background-image: url('/images/asc-desc.svg');
    background-repeat: no-repeat;
    background-position: center;
  }

  .ant-table-column-sorter-up.active {
    display: inline-block;
    background-image: url('/images/filter-asc.svg') !important;
    background-repeat: no-repeat;
    background-position: center;
    width: 9px;
    height: 16px;
  }

  .ant-table-column-sorter-down.active {
    display: inline-block;
    background-image: url('/images/filter-desc.svg') !important;
    background-repeat: no-repeat;
    background-position: center;
    width: 9px;
    height: 16px;
  }

  .ant-table-column-sorter-up.active + .ant-table-column-sorter-down {
    display: none;
    margin-top: 0px;
  }

  .ant-table-column-sorter-up + .ant-table-column-sorter-down {
    margin-top: 0px;
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #3f51b5;
  }

  .ant-checkbox-inner {
    background-color: #fff;
    border-color: #ced4da;
    width: 20px;
    height: 20px;
  }

  .ant-checkbox-inner::after {
    left: 25%;
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: #3f51b5;
    border-color: #3f51b5;
  }

  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #3f51b5;
  }

  .ant-checkbox-checked::after {
    border: 1px solid #3f51b5;
  }

  .ant-checkbox-indeterminate .ant-checkbox-inner::after {
    background-color: #3f51b5;
    left: 50%;
  }

  .ant-table-pagination.ant-pagination {
    display: none;
  }

  @media only screen and (max-width: 1086px) {
    overflow-x: scroll;
  }

  @media only screen and (max-width: 426px) {
    .ant-table .ant-table-container::before,
    .ant-table .ant-table-container::after {
      content: none;
    }
  }
`;

export const SearchArea = styled.div`
  background-color: #f4f4f4;
  height: 77px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 21px;
`;

export const SearchWrapper = styled.div`
  height: 32px;
  display: flex;
  align-items: center;
  > input {
    height: 100%;
    width: 251px;
  }

  @media only screen and (max-width: 426px) {
    width: 100%;
  }
`;

export const SearchText = styled.span`
  font-size: 14px;
  padding-right: 9px;
`;
