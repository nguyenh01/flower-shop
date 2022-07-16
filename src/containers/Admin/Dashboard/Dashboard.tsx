import { useGetDashboardQuery } from '@src/api/DashboardAPI';
import formatAmount from '@src/utils/formatAmount';
import Col from 'antd/lib/grid/col';
import Row, { Gutter } from 'antd/lib/grid/row';
import { FunctionComponent, useMemo } from 'react';
import {
  BsCalendar2WeekFill,
  BsCalendar2MonthFill,
  BsFillCalendar2CheckFill,
} from 'react-icons/bs';
import { FaBoxOpen } from 'react-icons/fa';
import { GrUserWorker } from 'react-icons/gr';
import { MdCardMembership, MdToday } from 'react-icons/md';
import styled from 'styled-components';
import Card from './Card';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin } from 'antd';
import Chart from './Chart';

const antIcon = <LoadingOutlined style={{ fontSize: 60 }} spin />;

const DashboardAdministration: FunctionComponent = () => {
  const gutter: [Gutter, Gutter] = useMemo(() => [30, 0], []);
  const span = useMemo(() => 6, []);
  const span2 = useMemo(() => 8, []);

  const { data: dashboard, isFetching } = useGetDashboardQuery({});
  const chart = useMemo(() => dashboard?.last_and_currentYear, [dashboard]);

  return (
    <Container>
      <Spin spinning={isFetching} indicator={antIcon}>
        <Row className="mb-25" gutter={gutter}>
          <Col span={span}>
            <Card
              title="today's total"
              value={formatAmount(dashboard?.total_day)}
              description="Total sales for today"
              icon={<MdToday />}
              fromColor="#5e72e4"
              toColor="#825ee4"
            />
          </Col>
          <Col span={span}>
            <Card
              title="Week's total"
              value={formatAmount(dashboard?.total_week)}
              description="Total sales for current week"
              icon={<BsCalendar2WeekFill />}
              fromColor="#f5365c"
              toColor="#f56036"
            />
          </Col>
          <Col span={span}>
            <Card
              title="Month's total"
              value={formatAmount(dashboard?.total_month)}
              description="Total sales for current month"
              icon={<BsCalendar2MonthFill />}
              fromColor="#2dce89"
              toColor="#2dcecc"
            />
          </Col>
          <Col span={span}>
            <Card
              title="Year's total"
              value={formatAmount(dashboard?.total_week)}
              description="Total sales for current year"
              icon={<BsFillCalendar2CheckFill />}
              fromColor="#fb6340"
              toColor="#fbb140"
            />
          </Col>
        </Row>
        <Row className="mb-50" gutter={gutter}>
          <Col span={span2}>
            <Card
              title="Product's total"
              value={`${dashboard?.total_product} product`}
              description="The total number of products of the store."
              icon={<FaBoxOpen />}
              fromColor="#4158D0"
              toColor="#C850C0"
            />
          </Col>
          <Col span={span2}>
            <Card
              title="Customer's total"
              value={`${dashboard?.total_customer} customer`}
              description="The total number of customers of the store."
              icon={<MdCardMembership />}
              fromColor="#8EC5FC"
              toColor="#E0C3FC"
            />
          </Col>
          <Col span={span2}>
            <Card
              title="Employee's total"
              value={`${dashboard?.total_employee} employee`}
              description="The total number of employees of the store."
              icon={<GrUserWorker className="employee-icon" />}
              fromColor="#00DBDE"
              toColor="#FC00FF"
            />
          </Col>
        </Row>
        <Chart data={chart} />
      </Spin>
    </Container>
  );
};

const Container = styled.div``;

export default DashboardAdministration;
