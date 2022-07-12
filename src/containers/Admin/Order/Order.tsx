import { OrderItem } from '@src/api/model/order.data-model';
import { useGetOrdersQuery } from '@src/api/OrderAPI';
import Input from '@src/components/Input/Input';
import ActionOrder from '@src/components/Table/ActionGroup/ActionOrder';
import { SearchArea, SearchText, SearchWrapper } from '@src/components/Table/style';
import Table from '@src/components/Table/Table';
import Tag from '@src/components/Tag';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import formatAmount from '@src/utils/formatAmount';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { TableContainer } from '../Product/Product';

interface OrderList {
  key: number;
  order_id: string;
  order_code: string;
  customer: string;
  type: string;
  order_date: string;
  status: number;
  payment: number;
}

const OrderAdministration: FunctionComponent = () => {
  const { t } = useTranslation();

  const tableInstance = Table.useTable({
    initialSortValue: {
      sortBy: 'order_code',
      sortDirection: 'asc',
    },
  });

  const { currentPage, pageSize } = tableInstance.values.pagination;
  const { sortBy, sortDirection } = tableInstance.values.sort;
  const { searchTerm, onChangeSearchTerm } = useDebounceSearch();

  const [orderList, setOrderList] = useState<OrderList[]>([]);

  const { data: orders, isFetching } = useGetOrdersQuery({
    page: currentPage,
    size: pageSize,
    sort: sortBy,
    direction: sortDirection,
    order_code: searchTerm,
  });

  const columns = useMemo(
    () => [
      {
        width: '5%',
        title: '',
        dataIndex: 'key',
      },
      {
        width: '10%',
        title: 'CODE',
        dataIndex: 'order_code',
        sorter: true,
      },
      {
        width: '15%',
        title: 'CUSTOMER',
        dataIndex: 'customer',
      },
      {
        width: '15%',
        title: 'CUSTOMER TYPE',
        dataIndex: 'type',
      },
      {
        width: '15%',
        title: 'ORDER DATE',
        dataIndex: 'order_date',
        sorter: true,
      },
      {
        width: '15%',
        title: 'STATUS',
        dataIndex: 'status',
        sorter: true,
        render: (status: number) => <Tag status={status} />,
      },
      {
        width: '15%',
        title: 'PAYMENT',
        dataIndex: 'payment',
        sorter: true,
        render: (price: number) => formatAmount(price),
      },
      {
        width: '10%',
        title: 'ACTION',
        dataIndex: 'order_id',
        render: (_: any, props: OrderList) => (
          <ActionOrder orderId={props.order_id} status={props.status} />
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (orders) {
      const list = orders?.data?.result?.map((item: OrderItem, index: number) => ({
        key:
          index +
          1 +
          (tableInstance.values.pagination.currentPage - 1) *
            tableInstance.values.pagination.pageSize,
        order_id: item._id,
        order_code: item.order_code,
        customer: `${item.first_name} ${item.last_name}`,
        type: item.customer_id === '' ? 'Walk-in Guest' : 'Member',
        order_date: item.order_date,
        status: item.status,
        payment: item.total_fee,
      }));
      setOrderList(list);
    }
  }, [orders]);

  return (
    <Container>
      <TableContainer>
        <SearchArea className="search-area">
          <SearchWrapper>
            <SearchText>Search:</SearchText>
            <Input
              className="search-input"
              type="text"
              onChange={onChangeSearchTerm}
              placeholder="Enter order code"
            />
          </SearchWrapper>
        </SearchArea>
        <Table
          tableInstance={tableInstance}
          dataSource={orderList}
          totalItems={orders?.data?.total_element ?? 0}
          columns={columns as any}
          loading={isFetching}
        />
      </TableContainer>
    </Container>
  );
};

const Container = styled.div`
  .search-area {
    justify-content: flex-end;
  }
`;

export default OrderAdministration;
