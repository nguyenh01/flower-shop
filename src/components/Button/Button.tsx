import { FunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { LoadingOutlined } from '@ant-design/icons';

interface ButtonProps {
  type: 'primary' | 'secondary' | 'default';
  children: any;
  onClick?: (event?: any) => void;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
}

interface ButtonType {
  loading?: boolean;
  disabled?: boolean;
}

const loadingButtonCSS = css`
  opacity: 0.7 !important;
  pointer-events: none !important;
`;

const reuseButton = css<ButtonType>`
  ${(props) => props.theme.displayFlex('center', 'center')};
  background-color: ${({ disabled }) => (disabled ? '#96addb' : '#000')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: none;
  color: #fff;
  transition: all 0.3s ease-in-out;
  ${(props) => props.loading && loadingButtonCSS};

  &:hover {
    color: #fff;
    background-color: ${(props) => props.theme.colors.primary};
  }
`;

const PrimaryButton = styled.button<ButtonType>`
  position: relative;
  z-index: 1;
  ${(props) => props.theme.fontCustom(15, 500, 15)};
  background-color: ${({ disabled }) => (disabled ? '#96addb' : 'transparent')};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  border: 2px solid #000;
  color: #000;
  letter-spacing: 0.025em;
  height: 45px;
  padding: 8px 30px;
  transition: all 0.4s ease-in-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
    color: #fff;

    &:after {
      width: 100%;
    }
  }

  &:after {
    content: '';
    position: absolute;
    z-index: -1;
    width: 0;
    height: 100%;
    top: 0;
    left: 0;
    background-color: ${(props) => props.theme.colors.primary};
    transition: all 0.4s ease-in-out;
  }
`;

const SecondaryButton = styled.button`
  ${reuseButton};
  ${(props) => props.theme.fontCustom(15, 500, 15)};
  letter-spacing: 0.025em;
  height: 45px;
  padding: 8px 30px;
`;

const DefaultButton = styled.button`
  ${reuseButton};
  text-transform: capitalize;
  border-radius: 4px;
  height: 40px;
  padding: 8px 25px;
`;

const LoadingIcon = () => {
  return <LoadingOutlined style={{ marginRight: '8px', fontSize: 24 }} spin />;
};

const Button: FunctionComponent<ButtonProps> = ({ type, loading, ...props }) => {
  if (type === 'primary') {
    return (
      <PrimaryButton loading={loading} {...props}>
        {loading && <LoadingIcon />}
        {props.children}
      </PrimaryButton>
    );
  } else if (type === 'secondary') {
    return (
      <SecondaryButton loading={loading} {...props}>
        {loading && <LoadingIcon />}
        {props.children}
      </SecondaryButton>
    );
  }
  return (
    <DefaultButton loading={loading} {...props}>
      {loading && <LoadingIcon />}
      {props.children}
    </DefaultButton>
  );
};

export default Button;
