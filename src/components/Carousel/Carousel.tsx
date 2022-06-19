import React, { Fragment, FunctionComponent, useState } from 'react';
import { Carousel as CarouselAntD } from 'antd';
import background from '@public/images/carousel_1.png';
import background2 from '@public/images/carousel_2.png';
import styled from 'styled-components';
import CarouselIntro from './CarouselIntro';
import { useTranslation } from 'react-i18next';

const Carousel: FunctionComponent = () => {
  const { t } = useTranslation();
  const [animation, setAnimation] = useState(true);
  const [animation2, setAnimation2] = useState(false);

  const carouselContent1: React.CSSProperties = {
    backgroundImage: `url('${background.src}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundOrigin: 'content-box',
    width: '100%',
    height: '840px',
  };

  const carouselContent2: React.CSSProperties = {
    backgroundImage: `url('${background2.src}')`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundOrigin: 'content-box',
    width: '100%',
    height: '840px',
  };

  const handleBeforeChange = (from: number, to: number) => {
    if (from === 0 && to === 1) {
      setAnimation(false);
      setAnimation2(true);
    } else {
      setAnimation(true);
      setAnimation2(false);
    }
  };

  return (
    <Container>
      <CarouselAntD
        autoplay
        dotPosition="bottom"
        effect="fade"
        easing={'ease-in-out'}
        beforeChange={handleBeforeChange}
      >
        <div>
          <div style={carouselContent1}>
            <CarouselIntro
              tag={t('home.topTrend')}
              title={t('home.title1')}
              description={t('home.description1')}
              animation={animation}
            />
          </div>
        </div>
        <div>
          <div style={carouselContent2}>
            <CarouselIntro
              tag={t('home.collection')}
              title={
                <Fragment>
                  <div dangerouslySetInnerHTML={{ __html: t('home.title2') }}></div>
                </Fragment>
              }
              description={t('home.description2')}
              animation={animation2}
            />
          </div>
        </div>
      </CarouselAntD>
    </Container>
  );
};

const Container = styled.div`
  padding-top: 94px;
`;

export default Carousel;
