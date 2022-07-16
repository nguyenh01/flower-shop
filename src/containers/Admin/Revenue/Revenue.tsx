import { Fragment, FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMemo } from 'react';
import Table from '@src/components/Table/Table';
import formatAmount from '@src/utils/formatAmount';
import { useGetRevenuesQuery } from '@src/api/RevenueAPI';
import Row, { Gutter } from 'antd/lib/grid/row';
import Col from 'antd/lib/grid/col';
import Select from '@src/components/Select/Select';
import { useFormik } from 'formik';
import moment from 'moment';
import { DatePicker } from 'antd';
import type { DatePickerProps } from 'antd';
import styled from 'styled-components';
import Button from '@src/components/Button/Button';
import Typography from '@src/components/Typography/Typography';

const initialValues = {
  option: 'day',
  selectedDate: moment(),
};

const options = [
  { value: 'day', name: 'Day' },
  { value: 'week', name: 'Week' },
  { value: 'month', name: 'Month' },
  { value: 'year', name: 'Year' },
];

const FORMAT_DATE = 'DD/MM/YYYY';

enum OptionEnum {
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month',
  YEAR = 'year',
}

interface Params {
  option: string;
  selectedDate: string;
}

const RevenueAdministration: FunctionComponent = () => {
  const { t } = useTranslation();

  const gutter: [Gutter, Gutter] = useMemo(() => [40, 0], []);
  const span = useMemo(() => 8, []);

  const tableInstance = Table.useTable({});

  const formik = useFormik({
    initialValues: initialValues,
    onSubmit: (values) => {
      const { option, selectedDate } = values;
      setParams({
        option,
        selectedDate: selectedDate.format(FORMAT_DATE),
      });
    },
  });

  const selectedDateFormik = formik.values.selectedDate;

  const [params, setParams] = useState<Params>({
    option: 'day',
    selectedDate: moment(selectedDateFormik).format(FORMAT_DATE),
  });

  const { data: revenue, isFetching } = useGetRevenuesQuery(params);

  useEffect(() => {
    formik.setFieldValue('selectedDate', moment());
  }, [formik.values.option]);

  const handleChangeDate: DatePickerProps['onChange'] = (date) => {
    formik.setFieldValue('selectedDate', date);
  };

  const selectedDate = () => {
    const option = formik.values.option;
    switch (option) {
      case OptionEnum.DAY:
        return (
          <Fragment>
            <Label>Day</Label>
            <DatePicker
              className="date-picker"
              value={formik.values.selectedDate}
              format="DD-MM-YYYY"
              onChange={handleChangeDate}
            />
          </Fragment>
        );
      case OptionEnum.WEEK:
        return (
          <Fragment>
            <Label>Week</Label>
            <DatePicker
              className="date-picker"
              value={formik.values.selectedDate}
              format="DD-MM-YYYY"
              picker={OptionEnum.WEEK}
              onChange={handleChangeDate}
            />
          </Fragment>
        );
      case OptionEnum.MONTH:
        return (
          <Fragment>
            <Label>Week</Label>
            <DatePicker
              className="date-picker"
              value={formik.values.selectedDate}
              format="DD-MM-YYYY"
              picker={OptionEnum.MONTH}
              onChange={handleChangeDate}
            />
          </Fragment>
        );
      case OptionEnum.YEAR:
        return (
          <Fragment>
            <Label>Year</Label>
            <DatePicker
              className="date-picker"
              value={formik.values.selectedDate}
              format="DD-MM-YYYY"
              picker={OptionEnum.YEAR}
              onChange={handleChangeDate}
            />
          </Fragment>
        );
    }
  };

  const columns = useMemo(
    () => [
      {
        width: '5%',
        title: 'CODE',
        dataIndex: 'order_code',
      },
      {
        width: '20%',
        title: 'EMAIL',
        dataIndex: 'email',
      },
      {
        width: '15%',
        title: 'PHONE',
        dataIndex: 'phone',
      },
      {
        width: '15%',
        title: 'ORDER DATE',
        dataIndex: 'order_date',
      },
      {
        width: '15%',
        title: 'SHIP DATE',
        dataIndex: 'ship_date',
      },
      {
        width: '15%',
        title: 'RECEIVE DATE',
        dataIndex: 'receive_date',
      },
      {
        width: '15%',
        title: 'TOTAL PAYMENT',
        dataIndex: 'total_fee',
        render: (total_fee: number) => formatAmount(total_fee),
      },
    ],
    [t]
  );

  return (
    <TableContainer>
      <Row className="mb-30" gutter={gutter}>
        <Col span={span}>
          <Select
            className="option"
            label="Option"
            name="option"
            value={formik.values.option}
            options={options.map((item) => ({
              key: item.value,
              value: item.value,
              render: () => item.name,
            }))}
            onChange={formik.handleChange}
          />
        </Col>
        <Col span={span}>{selectedDate()}</Col>
        <Col className="filter" span={span}>
          <Button className="filter-btn" type="default" onClick={formik.handleSubmit}>
            Filter
          </Button>
        </Col>
      </Row>
      <Table
        className="mb-40"
        tableInstance={tableInstance}
        dataSource={revenue?.result}
        totalItems={revenue?.result?.length ?? 0}
        columns={columns as any}
        loading={isFetching}
        showPagination={false}
      />
      {(revenue?.result?.length as number) > 0 && (
        <Typography.SectionTitle2 className="total">
          Total Revenue: <span className="amount">{formatAmount(revenue?.total)}</span>
        </Typography.SectionTitle2>
      )}
    </TableContainer>
  );
};

const TableContainer = styled.div`
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue} !important;
  }

  .date-picker {
    width: 100%;
    height: 40px;
    border-radius: 4px;

    &:hover,
    .ant-picker-focused {
      border-color: ${(props) => props.theme.colors.blue};
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue};
    }
  }

  .ant-picker-focused {
    border-color: ${(props) => props.theme.colors.blue};
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue};
  }

  .filter {
    ${(props) => props.theme.displayFlex('flex-start', 'flex-end')};
  }

  .filter-btn {
    background-color: ${(props) => props.theme.colors.blue};

    &:hover {
      background-color: ${(props) => props.theme.colors.blue};
    }
  }

  .total {
    text-align: right;
    ${(props) => props.theme.fontCustom(25, 500, 25)};

    .amount {
      color: ${(props) => props.theme.colors.blue};
    }
  }
`;

const Label = styled.div`
  font-weight: 500;
`;

export default RevenueAdministration;
