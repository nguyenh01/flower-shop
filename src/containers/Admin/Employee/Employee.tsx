import { useGetAccountListQuery } from '@src/api/UserAPI';
import Table from '@src/components/Table/Table';
import { RoleEnum } from '@src/utils/constants';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { TableContainer } from '../Product/Product';
import { useMemo } from 'react';

interface EmployeeItem {
  key: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const EmployeeAdministration: FunctionComponent = () => {
  const { t } = useTranslation();

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

  return (
    <TableContainer>
      <Table
        tableInstance={tableInstance}
        dataSource={employeeList}
        totalItems={accounts?.user?.total_element ?? 0}
        columns={columns as any}
        loading={isFetching}
      />
    </TableContainer>
  );
};

export default EmployeeAdministration;
