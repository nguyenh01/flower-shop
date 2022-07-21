import { useCreateEmployeeMutation, useGetAccountListQuery } from '@src/api/UserAPI';
import Table from '@src/components/Table/Table';
import { RoleEnum } from '@src/utils/constants';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableContainer } from '../Product/Product';
import { useMemo } from 'react';
import { SearchArea } from '@src/components/Table/style';
import { PlusIcon } from '@src/components/Icons';
import Button from '@src/components/Button/Button';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import useBooleanState from '@src/hooks/useBooleanState';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { requiredValidation } from '@src/utils/constants';
import Input from '@src/components/Input/Input';

interface EmployeeItem {
  key: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const initialValues = { email: '' };
const validationSchema = yup.object().shape({
  email: yup.string().trim().email('Invalid Email').required(requiredValidation('Email')),
});

const EmployeeAdministration: FunctionComponent = () => {
  const { t } = useTranslation();
  const customModal = useBooleanState();
  const successModal = useBooleanState();

  const tableInstance = Table.useTable({
    initialSortValue: {
      sortBy: 'email',
      sortDirection: 'asc',
    },
  });
  const { currentPage, pageSize } = tableInstance.values.pagination;
  const { sortBy, sortDirection } = tableInstance.values.sort;

  const [employeeList, setEmployeeList] = useState<EmployeeItem[]>([]);

  const { data: accounts, isFetching } = useGetAccountListQuery({
    page: currentPage,
    size: pageSize,
    sort: sortBy,
    direction: sortDirection,
    type: RoleEnum.EMPLOYEE,
  });
  const [createEmployee, { isLoading }] = useCreateEmployeeMutation();

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: (email) => {
      createEmployee(email)
        .unwrap()
        .then(() => {
          customModal.toggle();
          successModal.toggle();
        })
        .catch(() => {});
    },
  });

  const columns = useMemo(
    () => [
      {
        width: '10%',
        title: '',
        dataIndex: 'key',
      },
      {
        width: '22%',
        title: 'FIRST NAME',
        dataIndex: 'firstName',
        sorter: true,
      },
      {
        width: '22%',
        title: 'LAST NAME',
        dataIndex: 'lastName',
        sorter: true,
      },
      {
        width: '24%',
        title: 'EMAIL',
        dataIndex: 'email',
        sorter: true,
      },
      {
        width: '22%',
        title: 'PHONE NUMBER',
        dataIndex: 'phone',
        sorter: true,
      },
    ],
    [t]
  );

  useEffect(() => {
    if (accounts) {
      const list = accounts?.user?.result.map((item, index: number) => ({
        key:
          index +
          1 +
          (tableInstance.values.pagination.currentPage - 1) *
            tableInstance.values.pagination.pageSize,
        firstName: item.firstName,
        lastName: item.lastName,
        email: item.email,
        phone: item.phone,
      }));
      setEmployeeList(list);
    }
  }, [accounts]);

  const handleSubmitConfirm = () => {
    formik.handleSubmit();
  };

  return (
    <TableContainer>
      <SearchArea>
        <Button type="default" className="add-btn" onClick={customModal.toggle}>
          Add new <PlusIcon />
        </Button>
      </SearchArea>
      <Table
        tableInstance={tableInstance}
        dataSource={employeeList}
        totalItems={accounts?.user?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
      <CustomModal
        type="confirm"
        bodyType="custom"
        body={
          <Input
            type="text"
            label={t('label.email')}
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            formik={formik}
            required={true}
          />
        }
        visible={customModal.visible}
        onClose={customModal.toggle}
        closeText="Close"
        confirmText="Create"
        onConfirm={handleSubmitConfirm}
        isConfirmLoading={isLoading}
      />
      <CustomModal
        type="success"
        title="Create Employee Success"
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

export default EmployeeAdministration;
