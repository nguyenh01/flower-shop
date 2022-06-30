import { Modal, Space } from 'antd';
import { FunctionComponent } from 'react';
import { BsCheckCircleFill } from 'react-icons/bs';
import { IoClose } from 'react-icons/io5';
import { RiErrorWarningFill } from 'react-icons/ri';
import { TiDelete } from 'react-icons/ti';
import styled from 'styled-components';
import Button from '../Button/Button';

interface ModalConfirmProps {
  type: 'success' | 'confirm' | 'delete';
  visible: boolean;
  onClose: () => void;
  closeText?: string;
  onConfirm?: () => void;
  confirmText?: string;
  title: string;
  description?: string;
  showCloseButton?: boolean;
  showConfirmButton?: boolean;
  showCloseIcon?: boolean;
  isConfirmLoading?: boolean;
}

const ModalConfirm: FunctionComponent<ModalConfirmProps> = ({
  type,
  visible,
  onClose,
  closeText,
  onConfirm,
  confirmText,
  title,
  description,
  showCloseButton = true,
  showConfirmButton = true,
  isConfirmLoading,
  showCloseIcon = true,
}) => {
  const handleCloseModal = () => {
    onClose && onClose();
  };

  const handleConfirmModal = () => {
    onConfirm && onConfirm();
  };

  return (
    <ModalContainer type={type} visible={visible} closable={false} footer={null}>
      <div className="modal-content">
        {showCloseIcon && (
          <div className="close-icon">
            <IoClose onClick={handleCloseModal} />
          </div>
        )}
        <div className="type-icon mb-20">
          {type === 'success' ? (
            <BsCheckCircleFill className="success-icon" />
          ) : type === 'delete' ? (
            <TiDelete className="delete-icon" />
          ) : (
            <RiErrorWarningFill className="confirm-icon" />
          )}
        </div>
        <div className="modal-title mb-25">{title}</div>
        <div className="modal-description mb-25">{description}</div>
        <div className="btn-group">
          <Space size={10}>
            {showCloseButton && (
              <Button className="close-btn" type="default" onClick={handleCloseModal}>
                {closeText}
              </Button>
            )}
            {showConfirmButton && (
              <Button
                className="confirm-btn"
                type="default"
                loading={isConfirmLoading}
                onClick={handleConfirmModal}
              >
                {confirmText}
              </Button>
            )}
          </Space>
        </div>
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled(Modal)<{ type: string }>`
  .ant-modal-content {
    border-radius: 10px;
  }

  .ant-modal-body {
    padding: 20px;
  }

  .modal-content {
    .close-icon {
      text-align: end;

      svg {
        width: 23px;
        height: 23px;
        cursor: pointer;
      }
    }

    .type-icon {
      text-align: center;

      .success-icon {
        fill: ${(props) => props.theme.colors.green};
      }

      .confirm-icon {
        fill: ${(props) => props.theme.colors.blue};
      }

      .delete-icon {
        fill: ${(props) => props.theme.colors.red};
      }

      svg {
        width: 80px;
        height: 80px;
      }
    }

    .modal-title {
      ${(props) => props.theme.fontCustom(26, 500, 20)};
      text-align: center;
    }

    .modal-description {
      padding: 0 30px;
      text-align: center;
    }

    .btn-group {
      text-align: center;

      .close-btn:hover {
        background-color: #000;
      }

      .confirm-btn {
        background-color: ${({ type }) =>
          type === 'success' ? '#32a937' : type === 'confirm' ? '#0d6efd' : '#ff0000'};
      }
    }
  }
`;

export default ModalConfirm;
