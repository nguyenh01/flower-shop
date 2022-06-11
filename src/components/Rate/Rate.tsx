import { FunctionComponent } from 'react';
import { Rate as RateAntd, RateProps as RateAntdProps } from 'antd';
import styled from 'styled-components';

interface RateProps extends RateAntdProps {
  width?: number;
  height?: number;
  className?: string;
  disabled?: boolean;
  value: number;
  onChange?: (value: number) => void;
}

interface StyledRateProps {
  width?: number;
  height?: number;
}

const Rate: FunctionComponent<RateProps> = ({ ...props }) => {
  return <StyledRate allowHalf {...props} />;
};

const StyledRate = styled(RateAntd)<StyledRateProps>`
  color: ${(props) => props.theme.colors.primary} !important;

  .ant-rate-star svg {
    width: ${({ width }) => (width ? `${width}px` : '16px')};
    height: ${({ height }) => (height ? `${height}px` : '16px')};
  }
`;

export default Rate;
