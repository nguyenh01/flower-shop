import Button from '@src/components/Button/Button';
import Wrapper from '@src/components/Layout/Wrapper';
import Typography from '@src/components/Typography/Typography';
import Col from 'antd/lib/grid/col';
import Row, { Gutter } from 'antd/lib/grid/row';
import { FunctionComponent, useMemo } from 'react';
import styled from 'styled-components';
import { Image } from 'antd';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';
import { useTranslation } from 'react-i18next';

interface FlowerFormProps {
  title1: string;
  title2: string;
  description: string;
  button: string;
}

const AboutUs: FunctionComponent = () => {
  const { t } = useTranslation();

  const gutter: [Gutter, Gutter] = useMemo(() => [20, 80], []);
  const span = useMemo(() => 12, []);

  return (
    <Container>
      <Wrapper>
        <Row gutter={gutter} wrap>
          <Col className="grid" span={span}>
            <FlowerForm
              title1={t('about.title1')}
              title2={t('about.title11')}
              description={t('about.desc1')}
              button={t('home.collection')}
            />
          </Col>
          <Col span={span}>
            <Image width="100%" src="/images/au1.png" alt="img" />
          </Col>
          <Col span={span}>
            <Image width="100%" src="/images/au2.png" alt="img" />
          </Col>
          <Col className="grid" span={span}>
            <FlowerForm
              title1={t('about.title1')}
              title2={t('about.title12')}
              description={t('about.desc2')}
              button={t('home.collection')}
            />
          </Col>
        </Row>
      </Wrapper>
    </Container>
  );
};

const FlowerForm = ({ title1, title2, description, button }: FlowerFormProps) => {
  const router = useRouter();

  const handleGoToShop = () => {
    router.push(Path.SHOP);
  };

  return (
    <div className="flower-from">
      <Typography.SectionTitle1 className="title1 mb-5">{title1}</Typography.SectionTitle1>
      <Typography.SectionTitle2 className="title2 mb-5">{title2}</Typography.SectionTitle2>
      <p>{description}</p>
      <Button className="collect-btn" type="primary" onClick={handleGoToShop}>
        {button}
      </Button>
    </div>
  );
};

const Container = styled.div`
  height: 100vh;
  margin-top: 80px;

  .grid {
    display: grid;
  }

  .flower-from {
    margin-top: auto;
    margin-bottom: auto;

    .title1 {
      font-size: 22px;
    }

    .title2 {
      font-size: 36px;
      line-height: 36px;
    }

    .collect-btn {
      color: #fff;
      background-color: #000;
      text-transform: capitalize;
    }
  }
`;

export default AboutUs;
