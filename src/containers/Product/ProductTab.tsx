import { FunctionComponent } from 'react';
import styled from 'styled-components';
import useBooleanState from '@src/hooks/useBooleanState';

interface ProductTabProps {
  data?: any;
}

const ProductTab: FunctionComponent<ProductTabProps> = ({ data }) => {
  const tabState = useBooleanState(true);

  const handleChange = () => {
    tabState.toggle();
  };

  return (
    <Container>
      <div className="tabs">
        <div className={tabState.visible ? 'tab-item active' : 'tab-item'} onClick={handleChange}>
          description
        </div>
        <div className={tabState.visible ? 'tab-item' : 'tab-item active'} onClick={handleChange}>
          reviews
        </div>
      </div>
      {tabState.visible ? (
        <div className="tab-content">Description</div>
      ) : (
        <div className="tab-content">Reviews</div>
      )}
    </Container>
  );
};

const Container = styled.div`
  .tabs {
    ${(props) => props.theme.displayFlex('center', 'center')};
    width: 100%;

    .tab-item {
      ${(props) => props.theme.fontCustom(15, 700, 24)};
      padding: 8px 16px;
      background-color: #000c17;
      color: #fff;
      width: 50%;
      text-align: center;
      cursor: pointer;
      text-transform: uppercase;
      transition: all 0.3s ease-in-out;

      &:hover {
        background-color: ${(props) => props.theme.colors.primary};
      }

      &.active {
        background-color: ${(props) => props.theme.colors.primary};
      }
    }
  }

  .tab-content {
    padding: 40px;
    background-color: #f8f8f8;
    width: 100%;
  }
`;

export default ProductTab;
