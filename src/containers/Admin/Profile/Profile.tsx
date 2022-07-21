import AccountForm from '@src/containers/MyAccount/components/Account/AccountForm';
import ChangePassword from '@src/containers/MyAccount/components/ChangePassword/ChangePassword';
import Col from 'antd/lib/grid/col';
import Row, { Gutter } from 'antd/lib/grid/row';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';

const ProfileAdministration: FunctionComponent = () => {
  const gutter: [Gutter, Gutter] = useMemo(() => [20, 50], []);
  const span = useMemo(() => 24, []);

  return (
    <Container>
      <Row gutter={gutter}>
        <Col span={span}>
          <AccountForm showBackButton={false} resetForm={false} spinColor="blue" />
        </Col>
        <Col span={span}>
          <ChangePassword />
        </Col>
      </Row>
    </Container>
  );
};

const Container = styled.div`
  .ant-input {
    &:hover {
      border-color: ${(props) => props.theme.colors.blue} !important;
    }

    &:focus {
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue} !important;
      border-color: ${(props) => props.theme.colors.blue} !important;
    }
  }

  .ant-input-password {
    &:hover {
      border-color: ${(props) => props.theme.colors.blue} !important;
    }

    &.ant-input-affix-wrapper-focused {
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue} !important;
      border-color: ${(props) => props.theme.colors.blue} !important;
    }
  }

  button {
    background-color: ${(props) => props.theme.colors.blue};

    &:hover {
      background-color: ${(props) => props.theme.colors.blue};
    }
  }
`;

export default ProfileAdministration;
