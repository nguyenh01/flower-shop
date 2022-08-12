import { useGetOrderQuery, useGetOrdersQuery, useUpdateStatusMutation } from '@src/api/OrderAPI';
import Spin from '@src/components/Spin/Spin';
import Typography from '@src/components/Typography/Typography';
import { COLOR_STATUS, OrderStatusEnum } from '@src/utils/constants';
import formatAmount from '@src/utils/formatAmount';
import Col from 'antd/lib/col';
import { Gutter } from 'antd/lib/grid/row';
import Row from 'antd/lib/row';
import { Fragment, FunctionComponent, useMemo, useState } from 'react';
import { Image, Table } from 'antd';
import host from '@src/utils/host';
import { MdKeyboardBackspace } from 'react-icons/md';
import Container from './style';
import Button from '@src/components/Button/Button';
import useBooleanState from '@src/hooks/useBooleanState';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import { useTranslation } from 'react-i18next';

const Order: FunctionComponent = () => {
  const { t } = useTranslation();
  const gutter: [Gutter, Gutter] = useMemo(() => [0, 20], []);
  const confirmModal = useBooleanState();
  const failedModal = useBooleanState();

  const [showOrderDetail, setShowOrderDetail] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>('');

  const { data: orders, isFetching: isOrdersFetching } = useGetOrdersQuery({ is_paging: false });
  const { data: order, isFetching: isOrderFetching } = useGetOrderQuery(
    { id: orderId },
    { skip: !orderId }
  );
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  const isWaitingStatus = order?.orderInfo?.status === OrderStatusEnum.Waiting;
  const isConfirmStatus = order?.orderInfo?.status === OrderStatusEnum.Confirm;

  const handleShowOrderDetail = (id: string) => {
    setOrderId(id);
    setShowOrderDetail(true);
  };

  const handleBackOrderList = () => {
    setShowOrderDetail(false);
  };

  const handleConfirm = () => {
    if (isWaitingStatus) {
      updateStatus({ id: orderId, status: OrderStatusEnum.Cancelled })
        .unwrap()
        .then(() => {
          confirmModal.toggle();
        })
        .catch((error) => {
          if (error.status === 400) {
            confirmModal.toggle();
            failedModal.toggle();
          }
        });
    } else {
      updateStatus({ id: orderId, status: OrderStatusEnum.Received })
        .unwrap()
        .then(() => {
          confirmModal.toggle();
        })
        .catch(() => {});
    }
  };

  const handleShowConfirmModal = () => {
    confirmModal.toggle();
  };

  const columns = [
    {
      title: 'Image',
      dataIndex: 'imageList',
      align: 'center',
      render: (imageList: string[]) => (
        <Image src={`${host}${imageList[0]}`} width={100} alt="img" preview={false} />
      ),
    },
    {
      title: t('cart.product'),
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: t('cart.quantity'),
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: t('cart.price'),
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => formatAmount(price),
    },
  ];

  return (
    <Container>
      {showOrderDetail ? (
        <Fragment>
          <div className="back mb-30" onClick={handleBackOrderList}>
            <MdKeyboardBackspace className="back-icon" /> {t('myAccount.back')}
          </div>
          <Typography.Title className="mb-30">
            {t('myAccount.orderDetail')} - {order?.orderInfo?.order_code}
          </Typography.Title>
          <Spin spinning={isOrderFetching}>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.orderCode')}</Typography.Label>
              <div>{order?.orderInfo?.order_code}</div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.orderDate')}</Typography.Label>
              <div>{order?.orderInfo?.order_date}</div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">
                {t('myAccount.estimatedDelivery')}
              </Typography.Label>
              <div>{order?.orderInfo?.ship_date}</div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.status')}</Typography.Label>
              <div
                style={{
                  fontWeight: 500,
                  color: `${COLOR_STATUS[order?.orderInfo?.status as number]}`,
                }}
              >
                {OrderStatusEnum[order?.orderInfo?.status as number]}
              </div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">
                {t('myAccount.deliveryAddress')}
              </Typography.Label>
              <div style={{ textAlign: 'right' }}>{order?.orderInfo?.full_address}</div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.recipientEmail')}</Typography.Label>
              <div>{order?.orderInfo?.email}</div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.recipientName')}</Typography.Label>
              <div>
                {order?.orderInfo?.first_name} {order?.orderInfo?.last_name}
              </div>
            </div>
            <div className="order-detail">
              <Typography.Label className="label">{t('myAccount.recipientPhone')}</Typography.Label>
              <div>{order?.orderInfo?.phone}</div>
            </div>
            <Typography.Label>
              {t('myAccount.note')}:{' '}
              <span style={{ fontWeight: 400 }}>{order?.orderInfo?.note}</span>
            </Typography.Label>
            <Typography.Label2 className="order-info-title mb-20">
              {t('myAccount.orderInfo')}
            </Typography.Label2>
            <Table
              className="mb-20"
              columns={columns as any}
              dataSource={order?.orderDetailInfo ?? []}
              pagination={false}
            />
            <hr />
            <div className="order-detail">
              <Typography.Label>{t('myAccount.calculatedTemporary')}</Typography.Label>
              <div>{formatAmount(order?.orderInfo?.product_fee)}</div>
            </div>
            <div className="order-detail">
              <Typography.Label>{t('myAccount.shipFee')}</Typography.Label>
              <div>{formatAmount(order?.orderInfo?.ship_fee)}</div>
            </div>
            <div className="order-detail">
              <Typography.Label>{t('myAccount.totalPayment')}</Typography.Label>
              <Typography.Label className="total-payment">
                {formatAmount(order?.orderInfo?.total_fee)}
              </Typography.Label>
            </div>
            {isConfirmStatus && (
              <Button
                className="btn-confirmation"
                type="secondary"
                onClick={handleShowConfirmModal}
              >
                {t('myAccount.received')}
              </Button>
            )}
            {isWaitingStatus && (
              <Button
                className="btn-confirmation"
                type="secondary"
                onClick={handleShowConfirmModal}
              >
                {t('myAccount.cancelOrder')}
              </Button>
            )}
          </Spin>
        </Fragment>
      ) : (
        <Fragment>
          <Typography.Title className="mb-30">{t('myAccount.purchase')}</Typography.Title>
          <Spin spinning={isOrdersFetching}>
            {orders?.data?.length > 0 ? (
              <Row gutter={gutter} wrap>
                {orders?.data?.map((item: any) => (
                  <Col key={item._id} className="order-item" span={24}>
                    <div className="item code" onClick={() => handleShowOrderDetail(item._id)}>
                      {item.order_code}
                    </div>
                    <div className="item date">{item.order_date}</div>
                    <div className="item status" style={{ color: `${COLOR_STATUS[item.status]}` }}>
                      {OrderStatusEnum[item.status]}
                    </div>
                    <div className="item price">{formatAmount(item.total_fee)}</div>
                  </Col>
                ))}
              </Row>
            ) : (
              <Typography.Label2 className="not-order">{t('myAccount.notOrder')}</Typography.Label2>
            )}
          </Spin>
        </Fragment>
      )}
      <CustomModal
        type="confirm"
        title={isWaitingStatus ? 'Cancel Order' : 'Confirmation'}
        description={
          isWaitingStatus
            ? 'Do you want to cancel your order? This action cannot be undo.'
            : 'Are you sure you have received the goods?'
        }
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirm}
        isConfirmLoading={isLoading}
      />
      <CustomModal
        type="delete"
        title="Can not cancel order"
        description="You cannot cancel your order because your order has been confirmed."
        showCloseButton={false}
        visible={failedModal.visible}
        onClose={failedModal.toggle}
        onConfirm={failedModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
      />
    </Container>
  );
};

export default Order;
