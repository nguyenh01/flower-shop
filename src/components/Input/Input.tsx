import { Fragment, FunctionComponent } from 'react';
import Typography from '@src/components/Typography/Typography';
import { getIn } from 'formik';
import { Input as InputAntd } from 'antd';
import styled from 'styled-components';
import { BsFillEyeFill, BsFillEyeSlashFill } from 'react-icons/bs';

interface InputProps {
  type: 'text' | 'number' | 'password' | 'textarea';
  label?: string;
  name?: string;
  onChange: (event?: any) => void;
  value?: string | number | undefined;
  required?: boolean;
  disabled?: boolean;
  formik?: any;
  className?: string;
  placeholder?: string;
  onPressEnter?: (event?: any) => void;
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
        <StyledInput name={name} isError={isFormikError} {...props} />
      ) : type === 'password' ? (
        <StyledPasswordInput
          name={name}
          isError={isFormikError}
          iconRender={(visible) => (visible ? <BsFillEyeFill /> : <BsFillEyeSlashFill />)}
          {...props}
        />
      ) : type === 'number' ? (
        <StyledInput type="number" name={name} isError={isFormikError} {...props} />
      ) : (
        <StyledTextareaInput name={name} isError={isFormikError} {...props} />
      )}
      {errorMessage && isFormikError && (
        <ErrorText className="error-message">{errorMessage}</ErrorText>
      )}
    </Fragment>
  );
};

const StyledInput = styled(InputAntd)<{ isError: boolean }>`
  height: 40px;
  color: #333;
  border: 1px #d9d9d9 solid;
  border: 1px solid ${(props) => (!props.isError ? '#d9d9d9' : props.theme.colors.red)};
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

const StyledPasswordInput = styled(InputAntd.Password)<{ isError: boolean }>`
  height: 40px;
  color: #333;
  border: 1px solid ${(props) => (!props.isError ? '#d9d9d9' : props.theme.colors.red)};
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

const StyledTextareaInput = styled(InputAntd.TextArea)<{ isError: boolean }>`
  height: 40px;
  color: #333;
  border: 1px solid ${(props) => (!props.isError ? '#d9d9d9' : props.theme.colors.red)};
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
