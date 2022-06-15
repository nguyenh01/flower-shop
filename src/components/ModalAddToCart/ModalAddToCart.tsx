import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Modal, Image, Space } from 'antd';
import { TiTick } from 'react-icons/ti';
import { RiCloseCircleFill } from 'react-icons/ri';
import Button from '../Button/Button';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';
import { imgPath } from '@src/utils/constants';

interface ModalAddToCartProps {
  visible: boolean;
  onClose: () => void;
  content: {
    image?: string;
    name?: string;
  };
}

const ModalAddToCart: FunctionComponent<ModalAddToCartProps> = ({ visible, onClose, content }) => {
  const router = useRouter();

  const handleGoToPage = (page: string) => {
    if (page === 'cart') return router.push(Path.CART);
    return router.push(Path.CHECK_OUT);
  };

  const handleCloseModal = () => {
    onClose && onClose();
  };

  return (
    <ModalContainer visible={visible} closable={false} footer={null}>
      <div className="modal-content">
        <Image src={`${imgPath}${content?.image}`} width={141} preview={false} alt="img" />
        <div className="content">
          <div className="product-name mb-15">{content?.name}</div>
          <div className="success-message mb-30">
            <div className="icon">
              <TiTick />
            </div>
            Added to cart successfully!
          </div>
          <Space size={16}>
            <Button type="secondary" onClick={() => handleGoToPage('cart')}>
              View Cart
            </Button>
            <Button type="secondary" onClick={() => handleGoToPage('check-out')}>
              Checkout
            </Button>
          </Space>
        </div>
      </div>
      <div className="modal-close" onClick={handleCloseModal}>
        <RiCloseCircleFill className="close-icon" />
      </div>
    </ModalContainer>
  );
};

const ModalContainer = styled(Modal)`
  .ant-modal-body {
    padding: 15px;
  }

  .modal-content {
    ${(props) => props.theme.displayFlex('flex-start', 'center')}

    .ant-image {
      margin-right: 20px;
    }

    .product-name {
      ${(props) => props.theme.fontCustom(15, 400, 22.5)}
    }

    .success-message {
      ${(props) => props.theme.displayFlex('flex-start', 'center')}

      .icon {
        ${(props) => props.theme.displayFlex('center', 'center')}
        width: 24px;
        height: 24px;
        border-radius: 50%;
        background-color: #484848;
        margin-right: 10px;

        svg {
          width: 24px;
          height: 24px;
          fill: #fff;
        }
      }
    }
  }

  .modal-close {
    position: absolute;
    top: -20px;
    right: -20px;
    cursor: pointer;

    .close-icon {
      width: 25px;
      height: 25px;
      fill: #fff;
    }
  }
`;

export default ModalAddToCart;
