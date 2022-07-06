import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';
import Header from '@src/components/Header/Header';
import useAuthentication from '@src/hooks/useAuthentication';
import Footer from '../Footer/Footer';
import ChatBubble from '../Chatting/ChatBubble';
import useBooleanState from '@src/hooks/useBooleanState';
import ChatWindow from '../Chatting/ChatWindow/ChatWindow';
import useSelector from '@src/utils/useSelector';
import { RoleEnum } from '@src/utils/constants';

interface LayoutProps {
  children: ReactNode;
}

const Layout: FunctionComponent<LayoutProps> = ({ children }) => {
  const { isAuth, type } = useSelector((state) => state.userProfile);
  const isBuyer = type === RoleEnum.BUYER;
  const canChat = isAuth && isBuyer;

  const chatting = useBooleanState(true);
  useAuthentication();

  return (
    <Main>
      <Header />
      {children}
      {canChat &&
        (chatting.visible ? (
          <ChatBubble toggle={chatting.toggle} />
        ) : (
          <ChatWindow toggle={chatting.toggle} />
        ))}
      <Footer />
    </Main>
  );
};

const Main = styled.main`
  height: 80vh;
`;

export default Layout;
