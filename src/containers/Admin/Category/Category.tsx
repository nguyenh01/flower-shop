import Table from '@src/components/Table/Table';
import useBooleanState from '@src/hooks/useBooleanState';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDeleteCategoryMutation, useGetCategoriesQuery } from '@src/api/CategoryAPI';
import { truncateString } from '@src/utils/constants';
import ActionGroup from '@src/components/Table/ActionGroup/ActionGroup';
import { TableContainer } from '../Product/Product';
import { SearchArea, SearchText, SearchWrapper } from '@src/components/Table/style';
import Button from '@src/components/Button/Button';
import { PlusIcon } from '@src/components/Icons';
import Input from '@src/components/Input/Input';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import Path from '@src/utils/path';

interface CategoryList {
  id: string;
  name: string;
  description: string;
}

const CategoryAdministration: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();
  const failedModal = useBooleanState();

  const tableInstance = Table.useTable({
    initialSortValue: {
      sortBy: 'name',
      sortDirection: 'asc',
    },
  });

  const { currentPage, pageSize } = tableInstance.values.pagination;
  const { sortBy, sortDirection } = tableInstance.values.sort;
  const { searchTerm, onChangeSearchTerm } = useDebounceSearch();

  const [categoryList, setCategoryList] = useState<CategoryList[]>([]);
  const [categoryId, setCategoryId] = useState<string>('');

  const { data: categories, isFetching } = useGetCategoriesQuery({
    page: currentPage,
    size: pageSize,
    sort: sortBy,
    direction: sortDirection,
    name: searchTerm || undefined,
  });
  const [deleteCategory, { isLoading: isDeleteLoading }] = useDeleteCategoryMutation();

  const handleGoToUpdatePage = (id: string) => {
    router.push(Path.ADMIN.UPDATE_CATEGORY(id));
  };

  const handleGoToCreateCategoryPage = () => {
    router.push(Path.ADMIN.CREATE_CATEGORY);
  };

  const handleDeleteCategory = (id: string) => {
    setCategoryId(id);
    confirmModal.toggle();
  };

  const handleConfirmDelete = () => {
    deleteCategory({ id: categoryId })
      .unwrap()
      .then(() => {
        confirmModal.toggle();
        successModal.toggle();
      })
      .catch((error) => {
        if (error.status === 400) {
          confirmModal.toggle();
          failedModal.toggle();
        }
      });
  };

  const columns = useMemo(
    () => [
      {
        width: '10%',
        title: '',
        dataIndex: 'key',
      },
      {
        width: '30%',
        title: 'NAME',
        dataIndex: 'name',
        sorter: true,
      },
      {
        width: '45%',
        title: 'DESCRIPTION',
        dataIndex: 'description',
        render: (description: string) => truncateString(description),
      },
      {
        width: '15%',
        title: 'ACTION',
        dataIndex: 'id',
        align: 'center',
        render: (id: string) => (
          <ActionGroup
            handleUpdate={() => handleGoToUpdatePage(id)}
            handleDelete={() => handleDeleteCategory(id)}
          />
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (categories) {
      const list = categories?.data?.result?.map((item, index: number) => ({
        key:
          index +
          1 +
          (tableInstance.values.pagination.currentPage - 1) *
            tableInstance.values.pagination.pageSize,
        id: item._id,
        name: item.name,
        description: item.description,
      }));
      setCategoryList(list);
    }
  }, [categories]);

  return (
    <TableContainer>
      <SearchArea>
        <Button type="default" className="add-btn" onClick={handleGoToCreateCategoryPage}>
          Add new <PlusIcon />
        </Button>
        <SearchWrapper>
          <SearchText>Search:</SearchText>
          <Input className="search-input" type="text" onChange={onChangeSearchTerm} />
        </SearchWrapper>
      </SearchArea>
      <Table
        tableInstance={tableInstance}
        dataSource={categoryList}
        totalItems={categories?.data?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
      <ModalConfirm
        type="delete"
        title="Confirmation"
        description="Do you want to delete this categories?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirmDelete}
        isConfirmLoading={isDeleteLoading}
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
      <ModalConfirm
        type="delete"
        title="Cannot Delete"
        description="This product category cannot be removed because there are some products with this category"
        showCloseButton={false}
        visible={failedModal.visible}
        onClose={failedModal.toggle}
        onConfirm={failedModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
      />
    </TableContainer>
  );
};

export default CategoryAdministration;
