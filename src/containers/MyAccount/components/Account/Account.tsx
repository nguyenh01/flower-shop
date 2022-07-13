import Button from '@src/components/Button/Button';
import Spin from '@src/components/Spin/Spin';
import Typography from '@src/components/Typography/Typography';
import useBooleanState from '@src/hooks/useBooleanState';
import useSelector from '@src/utils/useSelector';
import { Fragment, FunctionComponent } from 'react';
import styled from 'styled-components';
import AccountForm from './AccountForm';

const Account: FunctionComponent = () => {
  const { profile } = useSelector((state) => state.userProfile);
  const showAccountForm = useBooleanState(true);

  const handleToggleForm = () => {
    showAccountForm.toggle();
  };

  return (
    <Container>
      {showAccountForm.visible ? (
        <Fragment>
          <Typography.Title className="mb-30">my account</Typography.Title>
          <Spin spinning={!profile.email}>
            <div className="account-info mb-25">
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
          <Button type="default" onClick={handleToggleForm}>
            Change Info
          </Button>
        </Fragment>
      ) : (
        <AccountForm toggle={handleToggleForm} />
      )}
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
