import { Fragment, FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';
import { Spin, Table, Image, Space } from 'antd';
import { useRouter } from 'next/router';
import { useGetOrderQuery, useUpdateStatusMutation } from '@src/api/OrderAPI';
import Typography from '@src/components/Typography/Typography';
import { COLOR_STATUS, OrderStatusEnum } from '@src/utils/constants';
import host from '@src/utils/host';
import formatAmount from '@src/utils/formatAmount';
import Button from '@src/components/Button/Button';
import useBooleanState from '@src/hooks/useBooleanState';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

enum TypeEnum {
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
}

const OrderDetailAdministration: FunctionComponent = () => {
  const router = useRouter();
  const { id: orderId } = router.query;

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();
  const failedModal = useBooleanState();

  const { data: order, isFetching: isOrderFetching } = useGetOrderQuery(
    { id: orderId as string },
    { skip: !orderId }
  );
  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  const isWaitingStatus = order?.orderInfo?.status === OrderStatusEnum.Waiting;

  const [type, setType] = useState<string>('');

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
      title: 'Product Name',
      dataIndex: 'name',
      align: 'center',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      align: 'center',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      align: 'center',
      render: (price: number) => formatAmount(price),
    },
  ];

  const handleConfirmModal = (type: string) => {
    if (type === TypeEnum.CONFIRM) {
      setType(TypeEnum.CONFIRM);
      confirmModal.toggle();
    } else {
      setType(TypeEnum.CANCEL);
      confirmModal.toggle();
    }
  };

  const handleConfirmSubmit = () => {
    if (type === TypeEnum.CONFIRM) {
      updateStatus({
        id: orderId as string,
        status: OrderStatusEnum.Confirm,
      })
        .unwrap()
        .then(() => {
          confirmModal.toggle();
          successModal.toggle();
        })
        .catch(() => {});
    } else {
      updateStatus({
        id: orderId as string,
        status: OrderStatusEnum.Cancelled,
      })
        .unwrap()
        .then(() => {
          confirmModal.toggle();
          successModal.toggle();
        })
        .catch((error) => {
          if (error.status === 400) {
            confirmModal.toggle();
            failedModal.toggle();
          }
        });
    }
  };

  const handleGoToOrderList = () => {
    router.back();
  };

  return (
    <Container>
      <Spin indicator={antIcon} spinning={isOrderFetching}>
        <div className="order-detail">
          <Typography.Label className="label">Order Code</Typography.Label>
          <div>{order?.orderInfo?.order_code}</div>
        </div>
        <div className="order-detail">
          <Typography.Label className="label">Order Date</Typography.Label>
          <div>{order?.orderInfo?.order_date}</div>
        </div>
        <div className="order-detail">
          <Typography.Label className="label">Estimated Delivery</Typography.Label>
          <div>{order?.orderInfo?.ship_date}</div>
        </div>
        <div className="order-detail">
          <Typography.Label className="label">Status</Typography.Label>
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
          <Typography.Label className="label">Delivery Address</Typography.Label>
          <div style={{ textAlign: 'right' }}>{order?.orderInfo?.full_address}</div>
        </div>
        <div className="order-detail">
          <Typography.Label className="label">Recipient Name</Typography.Label>
          <div>
            {order?.orderInfo?.first_name} {order?.orderInfo?.last_name}
          </div>
        </div>
        <div className="order-detail">
          <Typography.Label className="label">Recipient Phone Number</Typography.Label>
          <div>{order?.orderInfo?.phone}</div>
        </div>
        <Typography.Label>
          Note: <span style={{ fontWeight: 400 }}>{order?.orderInfo?.note}</span>
        </Typography.Label>
        <Typography.Label2 className="order-info-title mb-20">Order Information</Typography.Label2>
        <Table
          className="mb-20"
          columns={columns as any}
          dataSource={order?.orderDetailInfo ?? []}
          pagination={false}
        />
        <hr />
        <div className="order-detail">
          <Typography.Label>Calculated Temporary</Typography.Label>
          <div>{formatAmount(order?.orderInfo?.product_fee)}</div>
        </div>
        <div className="order-detail">
          <Typography.Label>Ship Fee</Typography.Label>
          <div>{formatAmount(order?.orderInfo?.ship_fee)}</div>
        </div>
        <div className="order-detail">
          <Typography.Label>Total Payment</Typography.Label>
          <Typography.Label className="total-payment">
            {formatAmount(order?.orderInfo?.total_fee)}
          </Typography.Label>
        </div>
        <div className="btn-group">
          <Space size={15}>
            <Button className="btn-control" type="default" onClick={handleGoToOrderList}>
              Back
            </Button>
            {isWaitingStatus && (
              <Fragment>
                <Button
                  className="btn-control"
                  type="default"
                  onClick={() => handleConfirmModal(TypeEnum.CONFIRM)}
                >
                  Confirm Order
                </Button>
                <Button
                  className="btn-control"
                  type="default"
                  onClick={() => handleConfirmModal(TypeEnum.CANCEL)}
                >
                  Cancel Order
                </Button>
              </Fragment>
            )}
          </Space>
        </div>
      </Spin>
      <ModalConfirm
        type="confirm"
        title={type === TypeEnum.CANCEL ? 'Cancel Order' : 'Confirmation'}
        description={
          type === TypeEnum.CANCEL
            ? 'Do you want to cancel your order? This action cannot be undo.'
            : 'Would you like to confirm this order?'
        }
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirmSubmit}
        isConfirmLoading={isLoading}
      />
      <ModalConfirm
        type="success"
        title={type === TypeEnum.CANCEL ? 'Cancel Order Success' : 'Confirm Order Success'}
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={successModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
      />
      <ModalConfirm
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

const Container = styled.div`
  .order-detail {
    ${(props) => props.theme.displayFlex('space-between', 'center')};

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .label {
      width: 25%;
    }

    .total-payment {
      font-size: 16px;
      font-weight: 600;
      color: ${(props) => props.theme.colors.blue};
    }
  }

  .order-info-title {
    margin-top: 50px;
    text-transform: uppercase;
    font-size: 18px;
  }

  .btn-group {
    margin-top: 80px;
    ${(props) => props.theme.displayFlex('center', 'center')};

    .btn-control {
      background-color: ${(props) => props.theme.colors.blue};
    }
  }
`;

export default OrderDetailAdministration;
