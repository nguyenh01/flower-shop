import Table from '@src/components/Table/Table';
import { useTranslation } from 'react-i18next';
import { useEffect, useMemo, useState } from 'react';
import { useGetProductsQuery } from '@src/api/ProductAPI';
import formatAmount from '@src/utils/formatAmount';
import ActionGroup from '@src/components/Table/ActionGroup/ActionGroup';
import styled from 'styled-components';
import { Image } from 'antd';
import { imgPath, truncateString } from '@src/utils/constants';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';

interface ProductList {
  key: number;
  id: string;
  name: string;
  price: number;
  unitsinstock: number;
  image: string;
  description: string;
}

interface StockProps {
  quantity: number;
}

const ProductAdministration = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const tableInstance = Table.useTable({
    initialSortValue: {
      sortBy: 'name',
      sortDirection: 'asc',
    },
  });

  const { currentPage, pageSize } = tableInstance.values.pagination;
  const { sortBy, sortDirection } = tableInstance.values.sort;

  const [productList, setProductList] = useState<ProductList[]>([]);

  const { data: product, isFetching } = useGetProductsQuery({
    size: pageSize,
    page: currentPage,
    sort: sortBy,
    direction: sortDirection,
    //name: product_name,
  });

  const Stock = ({ quantity }: StockProps) => {
    const handleCheckQuantity = (quantity: number) => (quantity <= 10 ? 'red' : 'default');

    return <div className={handleCheckQuantity(quantity)}>{quantity}</div>;
  };

  const handleGoToUpdatePage = (id: string) => {
    router.push(Path.UPDATE_ADMIN_PRODUCT(id));
  };

  const columns = useMemo(
    () => [
      {
        width: '5%',
        title: '',
        dataIndex: 'key',
      },
      {
        width: '10%',
        title: 'IMAGE',
        dataIndex: 'image',
        align: 'center',
        render: (image: string) => <Image src={`${imgPath}${image}`} width={100} alt="img" />,
      },
      {
        width: '20%',
        title: 'NAME',
        dataIndex: 'name',
        sorter: true,
      },
      {
        width: '25%',
        title: 'DESCRIPTION',
        dataIndex: 'description',
        render: (description: string) => truncateString(description),
      },
      {
        width: '10%',
        title: 'STOCK',
        dataIndex: 'unitsinstock',
        sorter: true,
        render: (stock: number) => <Stock quantity={stock} />,
      },
      {
        width: '15%',
        title: 'PRICE',
        dataIndex: 'price',
        sorter: true,
        render: (price: number) => formatAmount(price),
      },
      {
        width: '10%',
        title: 'ACTION',
        dataIndex: 'id',
        render: (id: string) => <ActionGroup handleUpdate={() => handleGoToUpdatePage(id)} />,
      },
    ],
    [t]
  );

  useEffect(() => {
    if (product) {
      const list = product?.data?.result?.map((item, index: number) => ({
        key:
          index +
          1 +
          (tableInstance.values.pagination.currentPage - 1) *
            tableInstance.values.pagination.pageSize,
        id: item._id,
        image: item.imageList[0],
        name: item.name,
        description: item.description,
        unitsinstock: item.unitsinstock,
        price: item.price,
      }));
      setProductList(list);
    }
  }, [product]);

  return (
    <Container>
      <Table
        tableInstance={tableInstance}
        dataSource={productList}
        totalItems={product?.data?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
    </Container>
  );
};

const Container = styled.div`
  .ant-table-cell .red {
    color: ${(props) => props.theme.colors.red};
  }
`;

export default ProductAdministration;
