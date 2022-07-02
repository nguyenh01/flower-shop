import Table from '@src/components/Table/Table';
import useBooleanState from '@src/hooks/useBooleanState';
import useDebounceSearch from '@src/hooks/useDebounceSearch';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useMemo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { truncateString } from '@src/utils/constants';
import ActionGroup from '@src/components/Table/ActionGroup/ActionGroup';
import { TableContainer } from '../Product/Product';
import { SearchArea, SearchText, SearchWrapper } from '@src/components/Table/style';
import Button from '@src/components/Button/Button';
import { PlusIcon } from '@src/components/Icons';
import Input from '@src/components/Input/Input';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import Path from '@src/utils/path';
import { useDeleteMaterialMutation, useGetMaterialsQuery } from '@src/api/MaterialAPI';

interface MaterialList {
  id: string;
  name: string;
  description: string;
}

const MaterialAdministration: FunctionComponent = () => {
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

  const [materialList, setMaterialList] = useState<MaterialList[]>([]);
  const [materialId, setMaterialId] = useState<string>('');

  const { data: materials, isFetching } = useGetMaterialsQuery({
    page: currentPage,
    size: pageSize,
    sort: sortBy,
    direction: sortDirection,
    name: searchTerm || undefined,
  });
  const [deleteMaterial, { isLoading: isDeleteLoading }] = useDeleteMaterialMutation();

  const handleGoToUpdatePage = (id: string) => {
    router.push(Path.ADMIN.UPDATE_MATERIAL(id));
  };

  const handleGoToCreateMaterialPage = () => {
    router.push(Path.ADMIN.CREATE_MATERIAL);
  };

  const handleDeleteMaterial = (id: string) => {
    setMaterialId(id);
    confirmModal.toggle();
  };

  const handleConfirmDelete = () => {
    deleteMaterial({ id: materialId })
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
            handleDelete={() => handleDeleteMaterial(id)}
          />
        ),
      },
    ],
    [t]
  );

  useEffect(() => {
    if (materials) {
      const list = materials?.data?.result?.map((item, index: number) => ({
        key:
          index +
          1 +
          (tableInstance.values.pagination.currentPage - 1) *
            tableInstance.values.pagination.pageSize,
        id: item._id,
        name: item.name,
        description: item.description,
      }));
      setMaterialList(list);
    }
  }, [materials]);

  return (
    <TableContainer>
      <SearchArea>
        <Button type="default" className="add-btn" onClick={handleGoToCreateMaterialPage}>
          Add new <PlusIcon />
        </Button>
        <SearchWrapper>
          <SearchText>Search:</SearchText>
          <Input className="search-input" type="text" onChange={onChangeSearchTerm} />
        </SearchWrapper>
      </SearchArea>
      <Table
        tableInstance={tableInstance}
        dataSource={materialList}
        totalItems={materials?.data?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
      <ModalConfirm
        type="delete"
        title="Confirmation"
        description="Do you want to delete this material?"
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
        description="This product material cannot be removed because there are some products with this material"
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

export default MaterialAdministration;
