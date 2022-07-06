import Input from '@src/components/Input/Input';
import { Avatar, Space } from 'antd';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { AiTwotoneCustomerService } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { GrSend } from 'react-icons/gr';
import Container from './style';
import { io } from 'socket.io-client';
import { host } from '@src/utils/constants';

interface ChatWindowProps {
  toggle: () => void;
}

const ChatWindow: FunctionComponent<ChatWindowProps> = ({ toggle }) => {
  const token = localStorage.getItem('token');

  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<any[]>([]);
  const socketRef = useRef<any>();

  console.log(messages);

  const handleCloseChatWindow = () => {
    toggle && toggle();
  };

  useEffect(() => {
    const socket = io(host, {
      auth: {
        token: token,
      },
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('Customer Socket', socket.id);
    });

    socket.on('connect_error', (error) => {
      console.log(error.message);
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
    });

    socket.on('receiveMessageFormCustomer', (message) => {
      console.log('message', message);
      setMessages((messages) => [...messages, message]);
    });

    socket.on('receiveMessageFormStore', (message) => {
      console.log('message', message);
      setMessages((messages) => [...messages, message]);
    });
  }, []);

  const handleChange = (event: any) => {
    setContent(event.target.value);
  };

  const sendMessage = (message: string) => {
    if (message) {
      const socket = socketRef.current;
      socket.emit('Chờ chó thiện lâu vl và còn gàaaaaa', message);
      setContent('');
    }
  };

  const handleSendMessage = () => {
    sendMessage(content);
  };

  const handlePressEnter = (event: any) => {
    const message = event.target.value;
    sendMessage(message);
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="info">
          <Avatar className="avatar" src="/images/chat-bot.png" />
          <span className="name">Customer Service</span>
          <AiTwotoneCustomerService />
        </div>
        <div className="close" onClick={handleCloseChatWindow}>
          <IoClose className="close-icon" />
        </div>
      </div>
      <div className="messages">
        <div className="time">Today at 11:41 AM</div>
        <div className="message me">Hey, man! What is up?</div>
        <div className="message service">Hey, man! What is up?</div>
        <Typing />
      </div>
      <div className="sending">
        <Input
          className="input"
          type="text"
          placeholder="Type your message here!"
          value={content}
          onChange={handleChange}
          onPressEnter={handlePressEnter}
        />
        <div className="send">
          <GrSend className="send-icon" onClick={handleSendMessage} />
        </div>
      </div>
    </Container>
  );
};

const Typing = () => {
  return (
    <div className="message service">
      <Space size={4}>
        <div className="typing typing-1"></div>
        <div className="typing typing-2"></div>
        <div className="typing typing-3"></div>
      </Space>
    </div>
  );
};

export default ChatWindow;
