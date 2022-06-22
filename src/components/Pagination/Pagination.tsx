import { FunctionComponent } from 'react';
import { Pagination as PaginationAntd } from 'antd';
import styled from 'styled-components';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onChange?: (page: number, pageSize?: number) => void;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onChange,
}) => {
  const fromShowing = currentPage === 1 ? 1 : currentPage * pageSize - 8;
  const toShowing = currentPage === 1 ? 9 : currentPage * pageSize + 1;

  return (
    <Container>
      <StyledPagination
        current={currentPage}
        total={totalItems}
        showSizeChanger={false}
        onChange={onChange}
        pageSize={pageSize}
      />
      <div className="count-result">
        Showing {fromShowing} - {toShowing} of {totalItems} result
      </div>
    </Container>
  );
};

const StyledPagination = styled(PaginationAntd)`
  .ant-pagination-item {
    background-color: #d9d9d9;

    a {
      font-weight: 500;
    }

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      border: unset;

      a {
        font-weight: 500;
        color: #fff;
      }
    }
  }

  .ant-pagination-item.ant-pagination-item-active {
    border-color: ${(props) => props.theme.colors.primary};
    background-color: ${(props) => props.theme.colors.primary};

    a {
      color: #fff;
    }
  }

  .ant-pagination-prev:hover .ant-pagination-item-link,
  .ant-pagination-next:hover .ant-pagination-item-link {
    color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  .ant-pagination-jump-prev .ant-pagination-item-container .ant-pagination-item-link-icon,
  .ant-pagination-jump-next .ant-pagination-item-container .ant-pagination-item-link-icon {
    color: ${(props) => props.theme.colors.primary};
  }
`;

const Container = styled.div`
  ${(props) => props.theme.displayFlex('space-between', 'center')};
  border: 1px solid ${(props) => props.theme.colors.border};
  padding: 15px 30px;
`;

export default Pagination;
