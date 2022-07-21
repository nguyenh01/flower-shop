import { useUpdateStatusMutation } from '@src/api/OrderAPI';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import useBooleanState from '@src/hooks/useBooleanState';
import { OrderStatusEnum } from '@src/utils/constants';
import Path from '@src/utils/path';
import { Space } from 'antd';
import { useRouter } from 'next/router';
import { Fragment, FunctionComponent, useState } from 'react';
import { BiDetail } from 'react-icons/bi';
import { HiCheck } from 'react-icons/hi';
import { MdOutlineCancel } from 'react-icons/md';
import styled from 'styled-components';

interface ActionOrderProps {
  orderId: string;
  status: number;
}

enum TypeEnum {
  CONFIRM = 'confirm',
  CANCEL = 'cancel',
}

const ActionOrder: FunctionComponent<ActionOrderProps> = ({ orderId, status }) => {
  const router = useRouter();
  const confirmModal = useBooleanState();
  const successModal = useBooleanState();
  const failedModal = useBooleanState();
  const isWaitingStatus = status === OrderStatusEnum.Waiting;

  const [type, setType] = useState<string>('');

  const [updateStatus, { isLoading }] = useUpdateStatusMutation();

  const handleGoToOrderDetail = () => {
    router.push(Path.ADMIN.ORDER_DETAIL(orderId));
  };

  const handleConfirm = (type: string) => {
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
        id: orderId,
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
        id: orderId,
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

  return (
    <ActionContainer>
      <Space size={15}>
        <BiDetail className="detail-icon" onClick={handleGoToOrderDetail} />
        {isWaitingStatus && (
          <Fragment>
            <HiCheck className="confirm-icon" onClick={() => handleConfirm(TypeEnum.CONFIRM)} />
            <MdOutlineCancel
              className="cancel-icon"
              onClick={() => handleConfirm(TypeEnum.CANCEL)}
            />
          </Fragment>
        )}
      </Space>
      <CustomModal
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
      <CustomModal
        type="success"
        title={type === TypeEnum.CANCEL ? 'Cancel Order Success' : 'Confirm Order Success'}
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={successModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
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
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  .detail-icon {
    fill: ${(props) => props.theme.colors.bold_gray};
  }

  .confirm-icon {
    fill: ${(props) => props.theme.colors.green};
  }

  .cancel-icon {
    fill: ${(props) => props.theme.colors.red};
  }
`;

export default ActionOrder;
