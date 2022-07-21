import Input from '@src/components/Input/Input';
import { RoleEnum, truncateString } from '@src/utils/constants';
import { Avatar, Spin } from 'antd';
import { Fragment, FunctionComponent, useEffect, useRef, useState } from 'react';
import { FaRegUser } from 'react-icons/fa';
import { GrSend } from 'react-icons/gr';
import Container from './style';
import { io } from 'socket.io-client';
import host from '@src/utils/host';
import { useLazyGetAccountListQuery } from '@src/api/UserAPI';
import { useLazyGetMessageByIdQuery } from '@src/api/MessageAPI';
import { Message } from '@src/api/model/message.data-model';
import moment from 'moment';
import { LoadingOutlined } from '@ant-design/icons';
import useSelector from '@src/utils/useSelector';

interface ChattingAvatarProps {
  name: string;
  color: string;
}

interface Customers {
  id: string;
  firstName: string;
  lastName: string;
  newMessageNum: number;
  conversation: Message[];
}

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const MessageAdministration: FunctionComponent = () => {
  const colors = ['#0D6EFD', '#e72463', '#32a937'];
  const random = Math.floor(Math.random() * colors.length);
  const token = localStorage.getItem('token');
  const { profile } = useSelector((state) => state.userProfile);

  const [getCustomers, { isFetching: isFetchingCustomers }] = useLazyGetAccountListQuery();
  const [getConversationById, { isFetching: isFetchingConversationId }] =
    useLazyGetMessageByIdQuery();

  const [content, setContent] = useState<string>('');
  const [color, setColor] = useState<string>('');
  const [socket, setSocket] = useState<any>();
  const [curCustomerId, setCurCustomerId] = useState<string>('');
  const [customers, setCustomers] = useState<Customers[]>([]);
  const curCustomerIdRef = useRef<any>();
  const firstName = customers.find((item) => item?.id === curCustomerId)?.firstName;
  const lastName = customers.find((item) => item?.id === curCustomerId)?.lastName;

  useEffect(() => {
    curCustomerIdRef.current = curCustomerId;
  }, [curCustomerId]);

  useEffect(() => {
    setColor(colors[random]);
  }, []);

  useEffect(() => {
    loadCustomers();

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
      setCustomers((customers) =>
        customers.map((item) => {
          if (item?.id === message.customer) {
            //@ts-ignore
            const clone = structuredClone(item);
            clone.conversation.push(message);
            return clone;
          }
          return item;
        })
      );
    });

    socket.on('receiveMessageFormCustomer', (message) => {
      setCustomers((customers) => {
        const customerList = customers.map((item) => {
          if (item?.id === message.customer) {
            //@ts-ignore
            const clone = structuredClone(item);
            clone.conversation.push(message);
            const curCustomerId = curCustomerIdRef.current;
            if (message.customer_id === curCustomerId) {
              socket.emit('readMessages', curCustomerId);
            } else {
              clone.newMessageNum += 1;
            }
            return clone;
          }
          return item;
        });
        return customerList;
      });
    });

    setSocket(socket);

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (curCustomerId) {
      setCustomers((customers) =>
        customers.map((cus) => {
          if (cus?.id === curCustomerId) {
            cus.newMessageNum = 0;
          }
          return cus;
        })
      );
      const customer = customers.find((cus) => cus?.id == curCustomerId);
      if ((customer?.newMessageNum as number) > 0) {
        socket.emit('readMessages', curCustomerId);
      }
    }
  }, [curCustomerId]);

  useEffect(() => {
    if (socket) {
      if (content) {
        socket.emit('typing', curCustomerId, profile.id);
      } else {
        socket.emit('stopTyping', curCustomerId, profile.id);
      }
    }
  }, [!!content]);

  const handleCustomerClick = (id: string) => {
    setCurCustomerId(id);
  };

  const sortCustomerList = (customers: any) => {
    return customers.sort((a: any, b: any) => {
      return b.newMessageNum - a.newMessageNum;
    });
  };

  const loadCustomers = async () => {
    const response = await getCustomers({ type: RoleEnum.BUYER });
    let customerList = await Promise.all(
      response?.data?.user?.result.map(async (item) => {
        const conversationRes = await getConversationById({ id: item._id });
        const conversation = conversationRes?.data?.message ?? [];
        const newMessageNum = conversation.reduce((total, mes) => {
          return total + (!mes.wasRead && mes.sender == item._id ? 1 : 0);
        }, 0);
        return {
          id: item._id,
          firstName: item.firstName,
          lastName: item.lastName,
          newMessageNum: newMessageNum,
          conversation: conversation,
        };
      }) as any
    );
    customerList = sortCustomerList(customerList);
    setCustomers(customerList as any);
    //@ts-ignore
    setCurCustomerId(customerList[0]?.id);
  };

  const renderConversation = () => {
    const customer = customers.find((item) => item?.id == curCustomerId);
    const conversation = customer?.conversation;

    if (!conversation) {
      return <></>;
    }

    return conversation.map((message, index) => {
      const isCustomer = curCustomerId == message.sender;
      const isDuplicateDate =
        index === 0
          ? false
          : moment(conversation[index].sent_time).date() ===
            moment(conversation[index - 1].sent_time).date();
      return (
        <Fragment key={message._id}>
          {!isDuplicateDate && (
            <div className="date">{moment(message.sent_time).format('DD/MM/YYYY')}</div>
          )}
          {isCustomer ? (
            <Fragment>
              <div className="message">
                <ChattingAvatar name={firstName as string} color={color} />
                <p className="text">{message.content}</p>
              </div>
              <p className="time">{moment(message.sent_time).format('HH:mm')}</p>
            </Fragment>
          ) : (
            <Fragment>
              <div className="message text-only">
                <div className="response">
                  <p className="text">{message.content}</p>
                </div>
              </div>
              <p className="time me">{moment(message.sent_time).format('HH:mm')}</p>
            </Fragment>
          )}
        </Fragment>
      );
    });
  };

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
    <Spin spinning={isFetchingCustomers || isFetchingConversationId} indicator={antIcon}>
      <Container>
        <div className="discussions">
          <div className="discussion wall"></div>
          <div className="user-list">
            {customers.map((item) => {
              const newMessage = item?.newMessageNum > 0;
              const active = item?.id === curCustomerId;
              return (
                <div
                  key={item?.id}
                  className={`discussion ${newMessage ? 'not-rep' : ''} ${
                    active ? 'message-active' : ''
                  }`}
                  onClick={() => handleCustomerClick(item?.id)}
                >
                  <ChattingAvatar name={item?.firstName} color={color} />
                  <div className="desc-contact">
                    <p
                      className={`${newMessage ? 'name not-rep' : 'name'}`}
                    >{`${item?.firstName} ${item?.lastName}`}</p>
                    <p className="message">
                      {truncateString(item?.conversation.slice(-1)[0]?.content as string, 40)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="chat">
          <div className="header-chat">
            <FaRegUser className="icon" />
            <p className="name">{`${firstName} ${lastName}`}</p>
          </div>
          <div className="messages-chat">{renderConversation()}</div>
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
    </Spin>
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
      {name?.slice(0, 1)}
    </Avatar>
  );
};

export default MessageAdministration;
