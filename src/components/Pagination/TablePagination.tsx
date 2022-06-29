import React, { FunctionComponent, useCallback } from 'react';
import styled from 'styled-components';
import AntPagination from 'antd/lib/pagination';
import { Button, Space, Typography } from 'antd';
import { DoubleArrowLeft, DoubleArrowRight } from '../Icons';
import InputNumber from '../Input/InputNumber';
import { useMediaQuery } from 'react-responsive';

const { Text } = Typography;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 15px;

  .ant-typography {
    font-size: 13px;
  }

  @media only screen and (max-width: 596px) {
    flex-direction: column;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
  }
`;

const CustomPagination = styled(AntPagination)`
  a {
    font-family: 'Montserrat', sans-serif;
  }

  li {
    border-radius: 50%;
    border: 1px solid #fff;
    width: 36px;
    height: 36px;
  }

  .ant-pagination-item-link {
    border-radius: 50%;
    border: none;
  }

  .ant-pagination-item {
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .ant-pagination-disabled .ant-pagination-item-link:hover {
    border: 1px solid #fff;
  }

  .ant-pagination-item-active {
    background-color: ${(props) => props.theme.colors.blue};
    border: 0;
    & > a {
      color: #fff;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .ant-pagination-item-active:hover {
    border: 0;
  }

  li[aria-disabled='false'] .ant-pagination-item-link {
    background-color: #ecf1f6;
  }
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    pointer-events: none;
    cursor: default;
  }

  @media only screen and (max-width: 668px) {
    .ant-pagination-item {
      margin-right: 0px;
    }
  }
`;

const FastIndicator = styled(Button)`
  width: 36px;
  height: 36px;
  padding: 0;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  border: 0;
  box-shadow: none;
  background-color: ${({ disabled }) => (disabled ? `'#fff' !important` : '#ecf1f6 !important')};

  &:hover {
    border: 0;
  }

  @media only screen and (max-width: 668px) {
    display: none;
  }
`;

interface TablePaginationProps {
  currentPage: number;
  totalItems: number;
  pageSize: number;
  onChange?: (page: number, pageSize?: number) => void;
}

const TablePagination: FunctionComponent<TablePaginationProps> = ({
  currentPage,
  totalItems,
  pageSize,
  onChange,
}) => {
  const isResponsive = useMediaQuery({ maxWidth: 755 });

  const onChangeItemPerPage = useCallback(
    (value: number) => {
      onChange && onChange(1, value);
    },
    [pageSize]
  );

  const onPrevFastPage = () => {
    onChange && onChange(currentPage - 5);
  };

  const onNextFastPage = () => {
    onChange && onChange(currentPage + 5);
  };
  return (
    <Container>
      <Space size={5} align="center">
        <Text>Show</Text>
        <InputNumber value={pageSize} max={totalItems} min={1} onChange={onChangeItemPerPage} />
        <Text>{`of ${totalItems} entries`}</Text>
      </Space>
      <Space size={5}>
        <FastIndicator onClick={onPrevFastPage} disabled={currentPage < 5}>
          <DoubleArrowLeft />
        </FastIndicator>
        <CustomPagination
          current={currentPage}
          total={totalItems}
          showSizeChanger={false}
          onChange={onChange}
          pageSize={pageSize}
          showLessItems={isResponsive}
        />
        <FastIndicator
          onClick={onNextFastPage}
          disabled={currentPage > Math.ceil(totalItems / pageSize) - 5}
        >
          <DoubleArrowRight />
        </FastIndicator>
      </Space>
    </Container>
  );
};

export default TablePagination;
