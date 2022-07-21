import { FunctionComponent, ReactNode } from 'react';
import { Spin as AntdSpin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface SpinProps {
  spinning: boolean;
  children: ReactNode;
  spinColor: 'pink' | 'blue';
}

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const Spin: FunctionComponent<SpinProps> = ({ children, spinColor, ...props }) => {
  return (
    <StyledSpin spinColor={spinColor} indicator={antIcon} {...props}>
      {children}
    </StyledSpin>
  );
};

const StyledSpin = styled(AntdSpin)<{ spinColor: 'pink' | 'blue' }>`
  svg {
    fill: ${(props) =>
      props.spinColor === 'pink' ? props.theme.colors.primary : props.theme.colors.blue};
  }
`;

export default Spin;
