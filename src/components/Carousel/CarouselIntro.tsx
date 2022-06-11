import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface CarouselIntroProps {
  tag: string;
  title: string | ReactNode;
  description: string;
  animation: boolean;
}

const CarouselIntro: FunctionComponent<CarouselIntroProps> = ({
  tag,
  title,
  description,
  animation,
}) => {
  return (
    <Container>
      <div className={animation ? 'title-slider animation' : 'title-slider'}>{tag}</div>
      <div className={animation ? 'title animation' : 'title'}>{title}</div>
      <div className={animation ? 'description animation' : 'description'}>{description}</div>
      <div className={animation ? 'button animation' : 'button'}>Shop Now</div>
    </Container>
  );
};

const Container = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 1200px;

  .title-slider {
    width: fit-content;
    color: #fff;
    background: ${(props) => props.theme.colors.primary};
    padding: 5px 10px;
    margin-bottom: 15px;
    text-transform: uppercase;

    &.animation {
      animation: fadeInUpCarousel 1s 0.5s both;
    }
  }

  .title {
    ${(props) => props.theme.fontCustom(80, 500, 80)};
    text-transform: capitalize;
    margin-bottom: 15px;

    &.animation {
      animation: fadeInUpCarousel 1s 0.9s both;
    }
  }

  .description {
    ${(props) => props.theme.fontCustom(16, 400, 28)};
    max-width: 655px;
    margin-bottom: 40px;

    &.animation {
      animation: fadeInUpCarousel 1s 1.3s both;
    }
  }

  .button {
    width: fit-content;
    height: 45px;
    letter-spacing: 0.025em;
    padding: 0 30px;
    text-align: center;
    color: #fff;
    background: ${(props) => props.theme.colors.primary};
    ${(props) => props.theme.fontCustom(15, 600, 45)};

    &.animation {
      animation: fadeInUpCarousel 1s 1.6s both;
    }
  }
`;

export default CarouselIntro;
