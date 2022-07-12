import { FunctionComponent } from 'react';
import styled from 'styled-components';

interface SpinnerFullScreenProps {
  color?: string;
  dark?: boolean;
}

const SpinnerFullScreen: FunctionComponent<SpinnerFullScreenProps> = ({
  color = '#fc6767',
  dark,
}) => {
  return (
    <Container color={color} dark={dark}>
      <div className="wrapper">
        <svg viewBox="0 0 100 100">
          <defs>
            <filter id="shadow">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor={color} />
            </filter>
          </defs>
          <circle id="spinner" cx="50" cy="50" r="45" />
        </svg>
      </div>
    </Container>
  );
};

const Container = styled.div<{ color?: string; dark?: boolean }>`
  position: fixed;
  z-index: 999;
  height: 2em;
  width: 2em;
  overflow: show;
  margin: auto;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  &:before {
    content: '';
    display: block;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: ${({ dark }) =>
      dark ? '#000' : 'radial-gradient(rgba(20, 20, 20, 0.8), rgba(0, 0, 0, 0.8))'};
  }

  .wrapper {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100px;
    height: 100px;
  }

  circle {
    fill: transparent;
    stroke: ${({ color, theme }) => color || theme.colors.primary};
    stroke-width: 7px;
    stroke-linecap: round;
    filter: url(#shadow);
  }

  @keyframes animation {
    0% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -105;
    }
    50% {
      stroke-dasharray: 80 10;
      stroke-dashoffset: -160;
    }
    100% {
      stroke-dasharray: 1 98;
      stroke-dashoffset: -300;
    }
  }

  #spinner {
    transform-origin: center;
    animation-name: animation;
    animation-duration: 1.2s;
    animation-timing-function: cubic-bezier;
    animation-iteration-count: infinite;
  }
`;

export default SpinnerFullScreen;
