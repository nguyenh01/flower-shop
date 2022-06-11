import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@src/components/Header/Header';
import useAuthentication from '@src/hooks/useAuthentication';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  useAuthentication();

  return (
    <Main>
      <Header />
      {children}
    </Main>
  );
};

const Main = styled.main`
  height: 80vh;
`;

export default Layout;
