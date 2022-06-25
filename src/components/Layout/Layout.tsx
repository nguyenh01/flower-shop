import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@src/components/Header/Header';
import useAuthentication from '@src/hooks/useAuthentication';
import Footer from '../Footer/Footer';
import useSelector from '@src/utils/useSelector';
import { RoleEnum } from '@src/utils/constants';
import {Fragment} from 'react';
import { Col, Row } from 'antd';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { type } = useSelector((state) => state.userProfile);
  useAuthentication();

  const isAdmin = type === RoleEnum.ADMIN;
  const isEmployee = type === RoleEnum.EMPLOYEE;

  return (
    <Main>
      {(isAdmin || isEmployee) ? (
        <Row>
          <Col span={4}>
            <div>123</div>
          </Col>
          <Col span={20}>
            <div>123</div>
          </Col>
        </Row>
      ) : (
        <Fragment>
          <Header />
          {children}
          <Footer />
        </Fragment>
      )}
    </Main>
  );
};

const Main = styled.main`
  height: 80vh;
`;

export default Layout;
