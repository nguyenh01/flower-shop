import Table from '@src/components/Table/Table';
import { useTranslation } from 'react-i18next';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { useDeleteProductMutation, useGetProductsQuery } from '@src/api/ProductAPI';
import formatAmount from '@src/utils/formatAmount';
import ActionGroup from '@src/components/Table/ActionGroup/ActionGroup';
import styled from 'styled-components';
import { Image } from 'antd';
import { imgPath, truncateString } from '@src/utils/constants';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';
import useBooleanState from '@src/hooks/useBooleanState';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import { SearchArea, SearchText, SearchWrapper } from '@src/components/Table/style';
import Button from '@src/components/Button/Button';
import Input from '@src/components/Input/Input';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { PlusIcon } from '@src/components/Icons';

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

const ProductAdministration: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const tableInstance = Table.useTable({
    initialSortValue: {
      sortBy: 'name',
      sortDirection: 'asc',
    },
  });

  const { currentPage, pageSize } = tableInstance.values.pagination;
  const { sortBy, sortDirection } = tableInstance.values.sort;
  const { searchTerm, onChangeSearchTerm } = useDebounceSearch();

  const [productList, setProductList] = useState<ProductList[]>([]);
  const [productId, setProductId] = useState<string>('');

  const { data: product, isFetching } = useGetProductsQuery({
    size: pageSize,
    page: currentPage,
    sort: sortBy,
    direction: sortDirection,
    name: searchTerm,
  });
  const [deleteProduct, { isLoading }] = useDeleteProductMutation();

  const Stock = ({ quantity }: StockProps) => {
    const handleCheckQuantity = (quantity: number) => (quantity <= 10 ? 'red' : 'default');

    return <div className={handleCheckQuantity(quantity)}>{quantity}</div>;
  };

  const handleGoToUpdatePage = (id: string) => {
    router.push(Path.ADMIN.UPDATE_PRODUCT(id));
  };

  const handleGoToCreateProductPage = () => {
    router.push(Path.ADMIN.CREATE_PRODUCT);
  };

  const handleDeleteProduct = (id: string) => {
    setProductId(id);
    confirmModal.toggle();
  };

  const handleConfirmDelete = () => {
    deleteProduct({ id: productId })
      .unwrap()
      .then(() => {
        confirmModal.toggle();
        successModal.toggle();
      })
      .catch(() => {});
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
        render: (id: string) => (
          <ActionGroup
            handleUpdate={() => handleGoToUpdatePage(id)}
            handleDelete={() => handleDeleteProduct(id)}
          />
        ),
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
    <TableContainer>
      <SearchArea>
        <Button type="default" className="add-btn" onClick={handleGoToCreateProductPage}>
          Add new <PlusIcon />
        </Button>
        <SearchWrapper>
          <SearchText>Search:</SearchText>
          <Input className="search-input" type="text" onChange={onChangeSearchTerm} />
        </SearchWrapper>
      </SearchArea>
      <Table
        tableInstance={tableInstance}
        dataSource={productList}
        totalItems={product?.data?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
      <ModalConfirm
        type="delete"
        title="Confirmation"
        description="Do you want to delete this product?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirmDelete}
        isConfirmLoading={isLoading}
      />
      <ModalConfirm
        type="success"
        title="Delete Success"
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={successModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
      />
    </TableContainer>
  );
};

export const TableContainer = styled.div`
  .ant-table-cell .red {
    color: ${(props) => props.theme.colors.red};
  }

  .add-btn {
    background-color: ${(props) => props.theme.colors.blue};

    svg {
      margin-left: 5px;
    }
  }

  .search-input {
    &:hover {
      border-color: ${(props) => props.theme.colors.blue};
    }

    &:focus {
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue};
      border-color: ${(props) => props.theme.colors.blue};
    }
  }
`;

export default ProductAdministration;
