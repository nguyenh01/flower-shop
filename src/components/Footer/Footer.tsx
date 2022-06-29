import { RoleEnum } from '@src/utils/constants';
import useSelector from '@src/utils/useSelector';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';

const Footer: FunctionComponent = () => {
  const router = useRouter();
  const { isAuth, type } = useSelector((state) => state.userProfile);
  const isAdmin = (type as number) === RoleEnum.ADMIN;
  const isEmployee = type === RoleEnum.EMPLOYEE;

  const handleGoToAdminPage = () => {
    router.push(Path.ADMIN.DASHBOARD);
  };

  return (
    <Container>
      <div className="copy-right">
        Copyright © 2022 | Built with <strong>Flower Sun</strong> by <strong>Nguyen</strong>.{' '}
        {isAuth && (isAdmin || isEmployee) && (
          <span className="color" onClick={handleGoToAdminPage}>
            Administrator
          </span>
        )}
      </div>
    </Container>
  );
};

const Container = styled.div`
  .copy-right {
    color: #fff;
    background-color: #000;
    padding: 20px 0;
    text-align: center;

    .color {
      color: ${(props) => props.theme.colors.primary};
      font-weight: 600;
      cursor: pointer;
    }
  }
`;

export default Footer;
