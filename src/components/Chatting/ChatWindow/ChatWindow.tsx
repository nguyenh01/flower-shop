import Input from '@src/components/Input/Input';
import { Avatar, Space } from 'antd';
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';
import { AiTwotoneCustomerService } from 'react-icons/ai';
import { IoClose } from 'react-icons/io5';
import { GrSend } from 'react-icons/gr';
import Container from './style';
import { io } from 'socket.io-client';
import socketHost from '@src/utils/socketHost';
import { useLazyGetMessagesQuery } from '@src/api/MessageAPI';
import useSelector from '@src/utils/useSelector';
import Spin from '@src/components/Spin/Spin';
import moment from 'moment';
import { Message } from '@src/api/model/message.data-model';

interface ChatWindowProps {
  toggle: () => void;
}

const ChatWindow: FunctionComponent<ChatWindowProps> = ({ toggle }) => {
  const token = localStorage.getItem('token');
  const { profile } = useSelector((state) => state.userProfile);

  const [content, setContent] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState<boolean>(false);
  const socketRef = useRef<any>();

  const [getMessages, { isFetching }] = useLazyGetMessagesQuery();

  const handleCloseChatWindow = () => {
    toggle && toggle();
  };

  useEffect(() => {
    loadMessages();
    const socket = io(socketHost, { auth: { token } });

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
      setMessages((messages) => [...messages, message]);
    });

    socket.on('receiveMessageFormStore', (message) => {
      setMessages((messages) => [...messages, message]);
    });

    socket.on('isTyping', (data) => {
      if (data) {
        setTyping(true);
      }
    });

    socket.on('isStopTyping', (data) => {
      if (data) {
        setTyping(false);
      }
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    const socket = socketRef.current;
    if (socket && profile) {
      socket.auth.token = token;
    }
    loadMessages();
  }, [profile]);

  const handleChange = (event: any) => {
    setContent(event.target.value);
  };

  const sendMessage = (message: string) => {
    if (message) {
      const socket = socketRef.current;
      socket.emit('sendMessageToStore', message);
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

  const loadMessages = async () => {
    const response = await getMessages({});
    const messages = response?.data?.message ?? [];
    setMessages(messages);
  };

  const renderMessages = () => {
    return (Array.isArray(messages) ? messages : []).map((mess, index) => {
      const mySelf = mess.sender === profile.id;
      const isDuplicateDate =
        index === 0
          ? false
          : moment(messages[index].sent_time).date() ===
            moment(messages[index - 1].sent_time).date();
      return (
        <Fragment key={mess._id}>
          {!isDuplicateDate && (
            <div className="date">{moment(mess.sent_time).format('DD/MM/YYYY')}</div>
          )}
          <div className={`message ${mySelf ? 'me' : 'service'}`}>{mess.content}</div>
          <div className={`time ${mySelf ? 'me' : 'service'}`}>
            {moment(mess.sent_time).format('HH:mm')}
          </div>
        </Fragment>
      );
    });
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
      <Spin spinning={isFetching}>
        <div className="messages">
          {renderMessages()} {typing && <Typing />}
        </div>
      </Spin>
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

export const Typing = () => {
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
