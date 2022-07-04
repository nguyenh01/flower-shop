import Wrapper from '@src/components/Layout/Wrapper';
import Tab from '@src/components/Tab/Tab';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Account from './components/Account';
import ChangePassword from './components/ChangePassword/ChangePassword';

const MyAccount: FunctionComponent = () => {
  const tabPane = [
    { key: '1', tab: 'my account', content: <Account /> },
    { key: '2', tab: 'purchase order', content: <div>order</div> },
    { key: '3', tab: 'change password', content: <ChangePassword /> },
  ];
  return (
    <Container>
      <Wrapper>
        <Tab tabPane={tabPane} />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 0;
  height: 100%;
`;

export default MyAccount;
