import Input from '@src/components/Input/Input';
import { truncateString } from '@src/utils/constants';
import useSelector from '@src/utils/useSelector';
import { Avatar } from 'antd';
import { FunctionComponent, useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GrSend } from 'react-icons/gr';
import Container from './style';
import { io } from 'socket.io-client';
import host from '@src/utils/host';

interface ChattingAvatarProps {
  name: string;
  color: string;
}

const MessageAdministration: FunctionComponent = () => {
  const colors = ['#0D6EFD', '#e72463', '#32a937'];
  const random = Math.floor(Math.random() * colors.length);
  const token = localStorage.getItem('token');

  const { profile } = useSelector((state) => state.userProfile);
  const [content, setContent] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [socket, setSocket] = useState<any>();
  const [curCustomerId, setCurCustomerId] = useState<string>('');
  const [customers, setCustomers] = useState<any>([]);
  const curCustomerIdRef = useRef<any>();

  useEffect(() => {
    curCustomerIdRef.current = curCustomerId;
  }, [curCustomerId]);

  useEffect(() => {
    setColor(colors[random]);
  }, []);

  useEffect(() => {
    const socket = io(host, {
      auth: { token },
    });

    socket.on('connect', () => {
      console.log(socket.id);
    });

    socket.on('connect_error', (err) => {
      console.log(err.message);
    });

    socket.on('disconnect', (reason) => {
      console.log(reason);
    });

    socket.on('receiveMessageFormStore', (message) => {
      setCustomers((customers: any) =>
        customers.map((item: any) => {
          if (item.id === message.customer_id) {
            item.conversation.push(message);
          }
          return item;
        })
      );
    });

    setSocket(socket);
  }, []);

  const handleSendMessage = () => {
    if (content) {
      socket.emit('sendMessageToCustomer', content, curCustomerId);
      setContent('');
    }
  };

  const handleChangeContent = (event: any) => {
    setContent(event.target.value);
  };

  const handleClickIconSendMessage = () => {
    handleSendMessage();
  };

  const handlePressEnter = (event: any) => {
    setContent(event.target.value);
    handleSendMessage();
    setContent('');
  };

  return (
    <Container>
      <div className="discussions">
        <div className="discussion wall"></div>
        <div className="user-list">
          <div className="discussion message-active">
            <ChattingAvatar name={profile.firstName} color={color} />
            <div className="desc-contact">
              <p className="name">Admin User</p>
              <p className="message">{truncateString('9 pm at the bar if possible', 40)}</p>
            </div>
          </div>
          <div className="discussion">
            <ChattingAvatar name={profile.firstName} color={color} />
            <div className="desc-contact">
              <p className="name">Admin User</p>
              <p className="message">{truncateString('9 pm at the bar if possible', 40)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="chat">
        <div className="header-chat">
          <FaRegUser className="icon" />
          <p className="name">Admin User</p>
        </div>
        <div className="messages-chat">
          <div className="message">
            <ChattingAvatar name={profile.firstName} color={color} />
            <p className="text">Hi, how are you ?</p>
          </div>
          <div className="message text-only">
            <p className="text">Hi, how are you ?</p>
          </div>
          <p className="time">14:35</p>
          <div className="message text-only">
            <div className="response">
              <p className="text">Hi, how are you ?</p>
            </div>
          </div>
        </div>
        <div className="footer-chat">
          <Input
            className="write-message"
            type="text"
            value={content}
            onChange={handleChangeContent}
            onPressEnter={handlePressEnter}
            placeholder="Type your message here ..."
          />
          <div className="send-message" onClick={handleClickIconSendMessage}>
            <GrSend className="send-icon" />
          </div>
        </div>
      </div>
    </Container>
  );
};

const ChattingAvatar = ({ name, color }: ChattingAvatarProps) => {
  return (
    <Avatar
      className="avatar"
      style={{
        backgroundColor: `${color}`,
        verticalAlign: 'middle',
        marginRight: '10px',
      }}
      size={40}
      gap={4}
    >
      {name.slice(0, 1)}
    </Avatar>
  );
};

export default MessageAdministration;
