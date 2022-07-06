import { Image } from 'antd';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { ProductItem } from '@src/api/model/product.data-model';
import formatAmount from '@src/utils/formatAmount';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';
import { handleAddToCartWithCookie } from '@src/containers/Product/ProductCookie';
import useSelector from '@src/utils/useSelector';
import { usePostCartItemMutation } from '@src/api/CartAPI';
import useBooleanState from '@src/hooks/useBooleanState';
import ModalAddToCart from '../ModalAddToCart/ModalAddToCart';
import host from '@src/utils/host';

interface ProductProps {
  product: ProductItem;
}

const Product: FunctionComponent<ProductProps> = ({ product }) => {
  const router = useRouter();
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const [postCartItem] = usePostCartItemMutation();
  const modalAddToCart = useBooleanState();

  const modalContent = useMemo(
    () => ({
      image: product?.imageList[0],
      name: product?.name,
    }),
    [product]
  );

  const handleGoToProductDetail = (id: string) => {
    router.push(Path.PRODUCT_DETAIL(id));
  };

  const handleAddToCart = async (id?: string) => {
    if (isAuth) {
      const payload = {
        cus_id: profile.id,
        product_id: product?._id,
        quantity: 1,
      };
      postCartItem(payload)
        .unwrap()
        .then(() => {
          modalAddToCart.toggle();
        })
        .catch((error) => console.log(error));
    } else {
      const item = {
        id: product?._id,
        image: product?.imageList[0],
        name: product?.name,
        price: product?.price,
        quantity: 1,
      };
      await handleAddToCartWithCookie(id, item, 1);
      modalAddToCart.toggle();
    }
  };

  return (
    <Container className="mb-30">
      <div className="product">
        <div className="product-image" onClick={() => handleGoToProductDetail(product._id)}>
          <div className="image_1">
            <Image src={`${host}${product?.imageList[0]}`} width={262} preview={false} alt="img" />
          </div>
          <div className="image_2">
            <Image src={`${host}${product?.imageList[1]}`} width={262} preview={false} alt="img" />
          </div>
          {product?.unitsinstock === 0 && <span className="soldout-title">Soldout</span>}
        </div>
        <div className="product-content">
          <div className="product-title mb-10">{product?.name}</div>
          <div className="product-price">{formatAmount(product?.price)}</div>
          {product?.unitsinstock === 0 ? (
            <div className="cart-title">Out of stock</div>
          ) : (
            <a className="cart-title" onClick={() => handleAddToCart(product?._id)}>
              add to cart
            </a>
          )}
        </div>
      </div>
      <ModalAddToCart
        visible={modalAddToCart.visible}
        onClose={modalAddToCart.toggle}
        content={modalContent}
      />
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  cursor: pointer;

  .product {
    cursor: pointer;
    transition: all 0.4s ease-in-out;

    &:hover {
      box-shadow: 0 5px 11px #00000024;
    }
  }

  .product-image {
    position: relative;
    text-align: center;
    overflow: hidden;

    .image_2 {
      position: absolute;
      opacity: 0;
      visibility: hidden;
      top: 0;
      left: 0;
      transition: all 0.4s ease-in-out;
    }

    &:hover {
      .image_2 {
        visibility: visible;
        opacity: 1;
      }
    }

    .soldout-title {
      ${(props) => props.theme.fontCustom(15, 500, 170)};
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
      width: 100px;
      height: 100px;
      position: absolute;
      left: -50px;
      top: -50px;
      transform: rotate(-45deg) translateZ(0) scale(1);
      backface-visibility: hidden;
    }
  }

  .product-content {
    background-color: #fff;
    padding: 20px;
    text-align: center;
    height: 85px;

    .product-title {
      ${(props) => props.theme.fontCustom(16, 650, 16)};
      transition: all 0.4s ease-in-out;
    }

    .product-price {
      ${(props) => props.theme.fontCustom(14, 600, 22.4)};
      transition: all 0.4s ease-in-out;
    }

    .cart-title {
      display: none;
      ${(props) => props.theme.fontCustom(12, 400, 18)};
      letter-spacing: 2px;
      text-transform: uppercase;
      transition: all 0.4s ease-in-out;
    }
  }

  &:hover {
    .product-title {
      color: ${(props) => props.theme.colors.primary};
    }

    .product-price {
      display: none;
    }

    .cart-title {
      display: block;
      animation: fadeInUpProduct 0.5s both;
    }
  }

  @keyframes fadeInUpProduct {
    from {
      transform: translate3d(0, 10px, 0);
    }

    to {
      transform: translate3d(0, 0, 0);
      opacity: 1;
    }
  }
`;

export default Product;
