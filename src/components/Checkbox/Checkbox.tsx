import { FunctionComponent } from 'react';
import { Checkbox as CheckboxAntd, CheckboxProps as AntdCheckboxProps } from 'antd';
import styled from 'styled-components';

export interface option {
  label: string;
  value: string;
}

interface CheckboxProps extends AntdCheckboxProps {
  type: 'single' | 'group';
  checked?: boolean;
  disabled?: boolean;
  name?: string;
  children?: any;
  onChange?: (event: any) => void;
  options?: option[];
  value?: string[];
}

const Checkbox: FunctionComponent<CheckboxProps> = ({ type, ...props }) => {
  if (type === 'single') {
    return <StyledCheckbox {...props}>{props.children}</StyledCheckbox>;
  }
  return <StyledCheckboxGroup {...props} />;
};

const StyledCheckbox = styled(CheckboxAntd)`
  display: flex;
  align-items: center;

  .ant-checkbox-inner {
    height: 20px;
    width: 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }

  .ant-checkbox {
    top: 0;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
  }

  .ant-checkbox-inner:after {
    content: '';
    position: absolute;
    display: none;
  }

  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }

  .ant-checkbox-checked::after {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:hover input ~ .ant-checkbox-inner {
    background-color: #fff;
  }

  input:checked ~ .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  input:checked ~ .ant-checkbox-inner:after {
    display: block;
  }

  .ant-checkbox-inner:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .ant-checkbox + span {
    padding-right: 11px;
    padding-left: 11px;
    font-size: 15px;
    line-height: 18px;
  }

  &:hover .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledCheckboxGroup = styled(CheckboxAntd.Group)`
  display: flex;
  align-items: flex-start;
  flex-direction: column;

  .ant-checkbox-inner {
    height: 20px;
    width: 20px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d9d9d9;
  }

  .ant-checkbox {
    top: 0;
  }

  .ant-checkbox-wrapper {
    display: flex;
    align-items: center;
    padding: 10px 0;
  }

  .ant-checkbox-inner:after {
    content: '';
    position: absolute;
    display: none;
  }

  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }

  .ant-checkbox-checked::after {
    border: 1px solid ${(props) => props.theme.colors.primary};
  }

  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:hover input ~ .ant-checkbox-inner {
    background-color: #fff;
  }

  input:checked ~ .ant-checkbox-inner {
    background-color: ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }

  input:checked ~ .ant-checkbox-inner:after {
    display: block;
  }

  .ant-checkbox-inner:after {
    left: 7px;
    top: 3px;
    width: 5px;
    height: 10px;
    border: solid #fff;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
  }

  .ant-checkbox + span {
    padding-right: 11px;
    padding-left: 11px;
    font-size: 15px;
    line-height: 18px;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner {
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

export default Checkbox;
