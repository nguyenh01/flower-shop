import Wrapper from '@src/components/Layout/Wrapper';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import ProductImage from '@src/containers/Product/ProductImage';
import ProductContent from '@src/containers/Product/ProductContent';
import ProductTab from '@src/containers/Product/ProductTab';
import { useRouter } from 'next/router';
import { useGetProductQuery } from '@src/api/ProductAPI';

const Product: FunctionComponent = () => {
  const router = useRouter();
  const { id } = router.query;

  const { data: productDetail } = useGetProductQuery({ id: id as string });

  const thumbnails = useMemo(() => productDetail?.imageList, [productDetail]);

  const content = useMemo(() => productDetail, [productDetail]);

  return (
    <Container>
      <Wrapper>
        <Row className="mb-100" gutter={[30, 0]}>
          <Col lg={10} md={24}>
            <ProductImage thumbnails={thumbnails} />
          </Col>
          <Col lg={14}>
            <ProductContent content={content} />
          </Col>
        </Row>
        <ProductTab />
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 100px;
  padding-bottom: 100px;

  .image {
    border: 1px solid #ddd;
  }

  .product-thumbnail {
    ${(props) => props.theme.displayFlex('center', 'center')};

    .thumbnail {
      border: 1px solid #ddd;

      &.active {
        border-color: ${(props) => props.theme.colors.primary};
      }
    }

    .ant-image {
      cursor: pointer;
    }

    .ant-image:not(:last-child) {
      margin-right: 20px;
    }
  }

  .product-title {
    ${(props) => props.theme.fontCustom(30, 400, 30)};
  }

  .product-price {
    ${(props) => props.theme.fontCustom(20, 600, 20)};
  }

  .product-rating {
    ${(props) => props.theme.displayFlex('flex-start', 'center')};

    .rate {
      margin-right: 15px;
    }
  }

  .quantity-with-button {
    ${(props) => props.theme.displayFlex('flex-start', 'center')};

    .product-variant {
      margin-right: 10px;
    }
  }

  .payment-button .btn {
    width: 318px;
    text-transform: uppercase;
  }

  .product-meta-title {
    ${(props) => props.theme.fontCustom(16, 600, 16)};
  }
`;

export default Product;
