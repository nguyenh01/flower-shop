import Spin from '@src/components/Spin/Spin';
import Typography from '@src/components/Typography/Typography';
import useSelector from '@src/utils/useSelector';
import { FunctionComponent } from 'react';
import styled from 'styled-components';

const Account: FunctionComponent = () => {
  const { profile } = useSelector((state) => state.userProfile);

  return (
    <Container>
      <Typography.Title className="mb-30">my account</Typography.Title>
      <Spin spinning={!profile.email}>
        <div className="account-info">
          <Typography.Label2>Email:</Typography.Label2>
          <div>{profile.email}</div>
          <Typography.Label2>First Name:</Typography.Label2>
          <div>{profile.firstName}</div>
          <Typography.Label2>Last Name:</Typography.Label2>
          <div>{profile.lastName}</div>
          <Typography.Label2>Phone:</Typography.Label2>
          <div>{profile.phone}</div>
        </div>
      </Spin>
    </Container>
  );
};

const Container = styled.div`
  .account-info {
    ${(props) => props.theme.createGridView('max-content auto', 40, 10)};
    align-items: center;
  }
`;

export default Account;
