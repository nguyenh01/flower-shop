import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUp } from '../Icons';

interface InputStatus {
  success?: boolean;
  error?: boolean;
  disabled?: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputWrapper = styled.div`
  width: fit-content;
  position: relative;
  display: inline-block;
`;

const StyledInputNumber = styled.input`
  width: 62px;
  height: 29px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  outline: none;
  padding: 0 10px;
  -moz-appearance: textfield;

  &:focus-visible {
    border: 1px solid #ced4da;
  }

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    box-shadow: 0px 0px 0px 3.2px rgba(0, 123, 255, 0.25);
  }
  ${(props: InputStatus) =>
    props.disabled &&
    `background-color: #E9ECEF;
  cursor: not-allowed;
  `}
`;

const ActionWrapper = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 5px 8px 5px;
  height: 100%;
`;

const Arrow = styled.div`
  cursor: pointer;
  width: 10px;
  height: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

interface InputProps {
  max?: number;
  min?: number;
  value: number;
  error?: boolean;
  success?: boolean;
  disabled?: boolean;
  message?: string;
  onChange?: (value: any) => void;
}

const InputNumber = (props: InputProps) => {
  const [value, setValue] = useState<number | string>(() => props.value);
  const { onChange } = props;

  useEffect(() => {
    onChange && onChange(value);
  }, [value]);

  const onPlus = () => {
    if (props.max && props.max < Number(value) + 1) return;
    setValue(Number(value) + 1);
  };

  const onMinus = () => {
    if (props.min && props.min > Number(value) - 1) return;
    setValue(Number(value) - 1);
  };

  const handleChange = (e: any) => {
    if (e.target.value === '') {
      setValue('');
      return;
    }

    if (isNaN(e.target.value)) return;

    const newValue = Number(e.target.value);

    if (props.max && props.max < newValue) {
      setValue(props.max);
      return;
    }
    if (props.min && props.min > newValue) {
      setValue(props.min);
      return;
    }

    setValue(newValue);
  };

  return (
    <Wrapper>
      <InputWrapper>
        <StyledInputNumber
          onChange={handleChange}
          type="number"
          value={value === '' ? value : Math.min(value as number, props.max ?? (value as number))}
        />
        <ActionWrapper>
          <Arrow onClick={onPlus}>
            <ArrowUp />
          </Arrow>

          <Arrow onClick={onMinus}>
            <ArrowDown />
          </Arrow>
        </ActionWrapper>
      </InputWrapper>
    </Wrapper>
  );
};

export default InputNumber;
