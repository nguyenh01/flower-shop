import { FunctionComponent, ReactNode } from 'react';
import { Spin as AntdSpin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import styled from 'styled-components';

interface SpinProps {
  spinning: boolean;
  children: ReactNode;
}

const antIcon = <LoadingOutlined style={{ fontSize: 30 }} spin />;

const Spin: FunctionComponent<SpinProps> = ({ children, ...props }) => {
  return (
    <StyledSpin indicator={antIcon} {...props}>
      {children}
    </StyledSpin>
  );
};

const StyledSpin = styled(AntdSpin)`
  svg {
    fill: ${(props) => props.theme.colors.primary};
  }
`;

export default Spin;
