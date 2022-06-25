import Wrapper from '@src/components/Layout/Wrapper';
import Typography from '@src/components/Typography/Typography';
import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const OurHistory: FunctionComponent = () => {
  const { t } = useTranslation();
  const { SectionTitle1, SectionTitle2 } = Typography;

  return (
    <Container className="mb-40">
      <Wrapper>
        <SectionTitle1 className="mb-15">{t('home.historySection1')}</SectionTitle1>
        <SectionTitle2 className="mb-10">{t('home.historySection2')}</SectionTitle2>
        <div className="history">
          <div className="history-title mb-35">{t('home.historyTitle')}</div>
          <div className="description">{t('menu.description')}</div>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  text-align: center;

  .history {
    margin: 0 auto;
    width: 60%;

    .history-title {
      ${(props) => props.theme.fontCustom(20, 550, 36)};
    }

    .description {
      ${(props) => props.theme.fontCustom(16, 400, 33)};
    }
  }
`;

export default OurHistory;
