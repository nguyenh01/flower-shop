import { FunctionComponent } from 'react';
import { BsChatDotsFill } from 'react-icons/bs';
import styled from 'styled-components';

interface ChatBubbleProps {
  toggle: () => void;
}

const ChatBubble: FunctionComponent<ChatBubbleProps> = ({ toggle }) => {
  const handleOpenChatWindow = () => {
    toggle && toggle();
  };

  return (
    <Container onClick={handleOpenChatWindow}>
      <BsChatDotsFill className="chat-icon" />
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.displayFlex('center', 'center')};

  position: fixed;
  right: 40px;
  bottom: 50px;

  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.primary};
  cursor: pointer;

  .chat-icon {
    width: 25px;
    height: 25px;
    fill: #fff;
  }
`;

export default ChatBubble;
