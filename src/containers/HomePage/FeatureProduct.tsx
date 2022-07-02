import Wrapper from '@src/components/Layout/Wrapper';
import Product from '@src/components/Product/Product';
import Typography from '@src/components/Typography/Typography';
import { Col, Row } from 'antd';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { useGetProductsQuery } from '@src/api/ProductAPI';
import SpinnerFullScreen from '@src/components/SpinnerFullScreen/SpinnerFullScreen';

const FeatureProduct: FunctionComponent = () => {
  const { t } = useTranslation();
  const { data: product, isLoading, isFetching } = useGetProductsQuery({ size: 8, page: 1 });
  const { SectionTitle1, SectionTitle3 } = Typography;

  return (
    <Container className="mt-65 mb-50">
      <Wrapper>
        <div className="align">
          <SectionTitle1 className="mb-15">{t('home.wonderfulGift')}</SectionTitle1>
          <SectionTitle3 className="mb-25">{t('home.featureProduct')}</SectionTitle3>
        </div>
        <Row gutter={[40, 0]}>
          {product?.data?.result.map((item) => (
            <Col key={item._id} span={6}>
              <Product product={item} />
            </Col>
          ))}
        </Row>
      </Wrapper>
      {(isLoading || isFetching) && <SpinnerFullScreen />}
    </Container>
  );
};

const Container = styled.div`
  .align {
    text-align: center;
  }

  .product-column {
    display: flex;
    justify-content: center;
  }
`;

export default FeatureProduct;
