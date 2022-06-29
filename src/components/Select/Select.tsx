import { Fragment, FunctionComponent, ReactNode } from 'react';
import { Select as SelectAntd } from 'antd';
import Typography from '@src/components/Typography/Typography';
import { getIn } from 'formik';
import styled from 'styled-components';
import { RiArrowDownSFill } from 'react-icons/ri';

interface SelectOption {
  key: string | number;
  value: string | number;
  render: (value?: string) => ReactNode;
}

interface SelectProps {
  placeholder?: ReactNode;
  name?: string;
  value?: any;
  onChange: (event: any) => void;
  options?: SelectOption[] | undefined;
  disabled?: boolean;
  className?: string;
  label?: string;
  formik?: any;
  required?: boolean;
  error?: any;
  showSearch?: boolean;
  filterOption?: (inputValue: any, option: any) => boolean;
  optionFilterProp?: string;
}

const Select: FunctionComponent<SelectProps> = ({
  name,
  formik,
  required,
  label,
  onChange,
  options,
  error,
  ...props
}) => {
  const { Label } = Typography;
  const isFormikError =
    !!name && !!getIn(formik, `errors.${name}`) && !!getIn(formik, `touched.${name}`);
  const isError = error || isFormikError;
  const errorMessage = name ? getIn(formik, `errors.${name}`) : '';

  const handleChange = (value: string) => {
    const fakeEvent = {
      target: {
        value: value,
        name: name,
      },
    };
    onChange(fakeEvent);
  };

  return (
    <Fragment>
      <Label>
        <span>{label}</span>
        {required ? <span className="required-mark">&nbsp;*</span> : null}
      </Label>
      <Container>
        <StyledSelect
          isError={isError}
          onChange={handleChange as any}
          suffixIcon={<RiArrowDownSFill className="down-icon" />}
          {...props}
        >
          {options &&
            options.map((item: any) => (
              <SelectAntd.Option key={item.key} value={item.value}>
                {item.render()}
              </SelectAntd.Option>
            ))}
        </StyledSelect>
        {errorMessage && isFormikError && (
          <ErrorText className="error-message">{errorMessage}</ErrorText>
        )}
      </Container>
    </Fragment>
  );
};

const StyledSelect = styled(SelectAntd)<{ isError: boolean }>`
  width: 100%;

  .ant-select-selector {
    padding: 0 15px !important;
  }

  .ant-select-selection-search input {
    border: unset !important;
  }

  .ant-select-selection-placeholder {
    display: flex;
    align-items: center;
  }

  .ant-select-selector,
  input {
    border: 1px solid
      ${(props) => (!props.isError ? props.theme.colors.border : props.theme.colors.red)} !important;
    border-radius: 4px !important;
    height: 40px !important;
  }

  .ant-select- .ant-select-selection-placeholder {
    color: #212529;
  }

  .ant-select-selection-item {
    display: flex;
    align-items: center;
  }

  & .ant-select-selection-item {
    ${(props) => props.theme.fontCustom(16, 400, 24)};
    padding-right: 30px !important;
  }

  .ant-select-arrow {
    border-left: 1px solid ${(props) => props.theme.colors.border};

    .down-icon {
      width: 20px;
      height: 20px;
    }
  }
`;

const Container = styled.div`
  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.primary};
    border-color: ${(props) => props.theme.colors.primary} !important;
  }
`;

const ErrorText = styled.span`
  font-size: 12px;
  color: ${(props) => props.theme.colors.red};
  margin-top: 5px;
`;

export default Select;
