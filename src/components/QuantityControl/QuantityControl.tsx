import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';

interface QuantityControlProps {
  className?: string;
  value: number;
  id?: string;
  onChange?: (quantity?: number, id?: any) => void;
}

const QuantityControl: FunctionComponent<QuantityControlProps> = ({
  className,
  value,
  onChange,
  id,
}) => {
  const [initialValue, setInitialValue] = useState(value);

  useEffect(() => {
    if (!isInt(initialValue)) {
      setInitialValue(1);
    }

    if (initialValue < 1) {
      setInitialValue(1);
    } else if (initialValue > 99) {
      setInitialValue(99);
    }

    if (id) {
      onChange && onChange(parseInt(initialValue as any), id);
    } else {
      onChange && onChange(parseInt(initialValue as any));
    }
  }, [initialValue]);

  const isInt = (value: any) => {
    const match = /^-?[0-9]+$/;
    return match.test(value);
  };

  const handleChange = (event: any) => {
    setInitialValue(event.target.value);
  };

  const handleMinusQuantity = () => {
    if (initialValue === 1) {
      setInitialValue(1);
    } else {
      setInitialValue(initialValue - 1);
    }
  };

  const handlePlusQuantity = () => {
    if (initialValue === 99) {
      setInitialValue(99);
    } else {
      setInitialValue(initialValue + 1);
    }
  };

  return (
    <Container className={className}>
      <div className="minus qtybutton" onClick={handleMinusQuantity}>
        -
      </div>
      <input className="qtyinput" type="text" value={initialValue} onChange={handleChange} />
      <div className="plus qtybutton" onClick={handlePlusQuantity}>
        +
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.displayFlex('center', 'center')};
  border: 1px solid #ddd;
  overflow: hidden;
  padding: 7px 5px;
  width: 80px;

  .qtyinput {
    width: 25px;
    height: 29px;
    font-size: 16px;
    background: transparent none repeat scroll 0 0;
    border: medium none;
    text-align: center;
  }

  .qtybutton {
    ${(props) => props.theme.fontCustom(16, 600, 20)};
    cursor: pointer;
    color: #666;
    width: 20px;
    height: 20px;
    text-align: center;
  }
`;

export default QuantityControl;
