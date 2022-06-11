import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { Col, Row } from 'antd';
import FilterCheckbox from '@src/containers/Shop/FilterCheckbox';
import { optionsAvailability } from '@src/containers/Shop/constant';
import Wrapper from '@src/components/Layout/Wrapper';
import ShopToolbar from '@src/containers/Shop/ShopToolbar';
import Product from '@src/components/Product/Product';
import { useGetProductsQuery } from '@src/api/ProductAPI';

const Shop: FunctionComponent = () => {
  const { data: product } = useGetProductsQuery({ size: 9, page: 1 });

  return (
    <Container>
      <Wrapper>
        <Row gutter={[30, 0]}>
          <Col lg={6} span={24}>
            <FilterCheckbox className="mb-35" title="Availability" options={optionsAvailability} />
          </Col>
          <Col lg={18} span={24}>
            <ShopToolbar />
            <Row gutter={[30, 0]} wrap>
              {product?.data?.result.map((item) => (
                <Col key={item._id} span={8}>
                  <Product product={item} />
                </Col>
              ))}
            </Row>
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 80px;
  padding-bottom: 80px;
`;

export default Shop;
