import { Fragment, FunctionComponent, useState } from 'react';
import Rate from '@src/components/Rate/Rate';
import QuantityControl from '@src/components/QuantityControl/QuantityControl';
import { Space } from 'antd';
import Button from '@src/components/Button/Button';
import ProductMeta from '@src/containers/Product/ProductMeta';
import {
  AmazonIcon,
  ApplepayIcon,
  BitcoinIcon,
  GooglepayIcon,
  PaypalIcon,
  VisaIcon,
} from '@src/components/Icons';
import { ProductItem } from '@src/api/DataModel/product.data-model';
import formatAmount from '@src/utils/formatAmount';
import { handleAddToCartWithCookie } from '@src/containers/Product/ProductCookie';
import useSelector from '@src/utils/useSelector';
import { usePostCartItemMutation } from '@src/api/CartAPI';

const categoriyLinks = [
  { name: 'Deal Product', href: '/' },
  { name: 'Featured Products', href: '/' },
  { name: 'Latest Products', href: '/' },
];

const tagLinks = [
  { name: 'black', href: '/' },
  { name: 'navy', href: '/' },
  { name: 'pink', href: '/' },
];

interface ProductContentProps {
  content: ProductItem | undefined;
}

const ProductContent: FunctionComponent<ProductContentProps> = ({ content }) => {
  const { isAuth, profile } = useSelector((state) => state.userProfile);

  const [postCartItem] = usePostCartItemMutation();

  const [quantity, setQuantity] = useState(1);

  const handleChangeQuantity = (quantity?: number) => {
    setQuantity(quantity as number);
  };

  const handleAddToCart = (id?: string) => {
    if (isAuth) {
      const payload = {
        cus_id: profile.id,
        product_id: content?._id,
        quantity,
      };
      postCartItem(payload)
        .unwrap()
        .then(() => {})
        .catch((error) => console.log(error));
    } else {
      const product = {
        id: content?._id,
        image: content?.imageList[0],
        name: content?.name,
        price: content?.price,
        quantity,
      };
      handleAddToCartWithCookie(id, product, quantity);
    }
  };

  return (
    <Fragment>
      <div className="product-title mb-15">{content?.name}</div>
      <div className="product-price mb-10">{formatAmount(content?.price)}</div>
      <div className="product-rating mb-15">
        <Rate className="rate" value={3.5} disabled />
        <div className="rate-caption">1 review</div>
      </div>
      <div className="product-inventory mb-15">
        Availability:{' '}
        {(content?.unitsinstock as number) > 0
          ? `${content?.unitsinstock} left in stock`
          : 'Out of stock'}
      </div>
      <div className="product-description mb-25">{content?.description}</div>
      <div className="quantity-with-button mb-15">
        <Space size={10}>
          <QuantityControl
            className="product-variant"
            value={quantity}
            onChange={handleChangeQuantity}
          />
          <Button type="secondary" onClick={() => handleAddToCart(content?._id)}>
            Add to cart
          </Button>
        </Space>
      </div>
      <div className="payment-button mb-15">
        <Button className="btn" type="primary">
          buy it now
        </Button>
      </div>
      <div className="product-category mb-10">
        <ProductMeta title="Category" links={categoriyLinks} />
      </div>
      <div className="product-tag mb-15">
        <ProductMeta title="Tag" links={tagLinks} />
      </div>
      <div className="payment-option">
        <div className="product-meta-title mb-5">Guaranteed safe checkout</div>
        <div className="method-of-payment">
          <Space size={10}>
            <AmazonIcon />
            <ApplepayIcon />
            <BitcoinIcon />
            <GooglepayIcon />
            <PaypalIcon />
            <VisaIcon />
          </Space>
        </div>
      </div>
    </Fragment>
  );
};

export default ProductContent;
