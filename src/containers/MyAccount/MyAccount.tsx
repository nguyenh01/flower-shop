import Wrapper from '@src/components/Layout/Wrapper';
import Tab from '@src/components/Tab/Tab';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import Order from '../Order/Order';
import Account from './components/Account/Account';
import ChangePassword from './components/ChangePassword/ChangePassword';

const MyAccount: FunctionComponent = () => {
  const { t } = useTranslation();

  const tabPane = [
    { key: '1', tab: t('menu.myAccount'), content: <Account /> },
    { key: '2', tab: t('myAccount.purchase'), content: <Order /> },
    { key: '3', tab: t('myAccount.changePassword'), content: <ChangePassword /> },
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
