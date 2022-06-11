import { Fragment, FunctionComponent } from 'react';
import Typography from '@src/components/Typography/Typography';
import { getIn } from 'formik';
import { Input as InputAntd } from 'antd';
import styled from 'styled-components';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface InputProps {
  type: 'text' | 'password' | 'textarea';
  label: string;
  name: string;
  onChange: (event?: any) => void;
  value: string | number;
  required?: boolean;
  disabled?: boolean;
  formik?: any;
  className?: any;
}

const Input: FunctionComponent<InputProps> = ({
  type,
  label,
  formik,
  name,
  required,
  ...props
}) => {
  const { Label } = Typography;
  const isFormikError =
    !!name && !!getIn(formik, `errors.${name}`) && !!getIn(formik, `touched.${name}`);
  const errorMessage = name ? getIn(formik, `errors.${name}`) : '';

  return (
    <Fragment>
      <Label>
        <span>{label}</span>
        {required ? <span className="required-mark">&nbsp;*</span> : null}
      </Label>
      {type === 'text' ? (
        <StyledInput name={name} {...props} />
      ) : type === 'password' ? (
        <StyledPasswordInput
          name={name}
          {...props}
          iconRender={(visible) => (visible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />)}
        />
      ) : (
        <StyledTextareaInput name={name} {...props} />
      )}
      {errorMessage && isFormikError && (
        <ErrorText className="error-message">{errorMessage}</ErrorText>
      )}
    </Fragment>
  );
};

const StyledInput = styled(InputAntd)`
  height: 40px;
  color: #333;
  border: 1px #d9d9d9 solid;
  border-radius: 5px;
  padding: 13px 11px;
  outline: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary};
  }

  &:focus {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary};
  }
`;

const StyledPasswordInput = styled(InputAntd.Password)`
  height: 40px;
  color: #333;
  border: 1px #d9d9d9 solid;
  border-radius: 5px;
  padding: 8px 11px;
  outline: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary} !important;
  }

  &.ant-input-affix-wrapper-focused {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary} !important;
    border-color: ${(props) => props.theme.colors.primary} !important;
  }

  .ant-input-suffix svg {
    width: 20px;
    height: 18px;
  }
`;

const StyledTextareaInput = styled(InputAntd.TextArea)`
  height: 40px;
  color: #333;
  border: 1px #d9d9d9 solid;
  border-radius: 5px;
  padding: 8px 11px;
  outline: none;

  &:hover {
    border-color: ${(props) => props.theme.colors.primary} !important;
  }

  &:focus {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary} !important;
    border-color: ${(props) => props.theme.colors.primary} !important;
  }

  .ant-input-suffix svg {
    width: 20px;
    height: 18px;
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 5px;
`;

export default Input;
