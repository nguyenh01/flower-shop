import { FunctionComponent, ReactNode } from 'react';
import styled from 'styled-components';

interface CardProps {
  title: string;
  value?: string | number;
  description: string;
  icon: ReactNode;
  fromColor: string;
  toColor: string;
}

const Card: FunctionComponent<CardProps> = ({
  title,
  value,
  description,
  icon,
  fromColor,
  toColor,
}) => {
  return (
    <Container fromColor={fromColor} toColor={toColor}>
      <div className="row">
        <div className="card-content">
          <div className="title">{title}</div>
          <div className="value">{value}</div>
          <div className="description">{description}</div>
        </div>
        <div className="icon">
          <div className="circle">{icon}</div>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div<{ fromColor: string; toColor: string }>`
  height: 115px;
  padding: 16px;
  border-radius: 16px;
  box-shadow: 0 0 2rem 0 rgb(136 152 170 / 15%);

  .row {
    ${(props) => props.theme.displayFlex('space-between', 'flex-start')};

    .card-content {
      .title {
        ${(props) => props.theme.fontCustom(16, 600, 23)};
        text-transform: uppercase;
        color: rgb(103, 116, 142);
      }

      .value {
        ${(props) => props.theme.fontCustom(20, 700, 27)};
        color: rgb(52, 71, 103);
        margin-bottom: 8px;
      }

      .description {
        ${(props) => props.theme.fontCustom(14, 400, 26)};
        color: rgb(103, 116, 142);
      }
    }

    .icon {
      .circle {
        ${(props) => props.theme.displayFlex('center', 'center')};
        width: 48px;
        height: 48px;
        border-radius: 50%;
        background-image: linear-gradient(
          310deg,
          ${({ fromColor }) => fromColor},
          ${({ toColor }) => toColor}
        );

        svg {
          width: 20px;
          height: 20px;
          fill: #fff;
        }

        .employee-icon {
          width: 20px;
          height: 20px;

          path {
            stroke: #fff;
          }
        }
      }
    }
  }
`;

export default Card;
