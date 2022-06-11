import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Select from '@src/components/Select/Select';
import { optionsSortBy } from '@src/containers/Shop/constant';

interface ShopToolbarProps {
  data?: any;
}

const ShopToolbar: FunctionComponent<ShopToolbarProps> = ({ data }) => {
  console.log(data);
  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <Container className="mb-30">
      <div className="shop-layout"></div>
      <div className="sort">
        <div className="sort-by">Sort by</div>
        <Select
          name="sort"
          value="a-z"
          onChange={handleChange}
          options={optionsSortBy.map((item) => ({
            key: item.value,
            value: item.value,
            render: () => item.name,
          }))}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  ${(props) => props.theme.displayFlex('space-between', 'center')};
  padding: 15px 30px;
  border: 1px solid #d8d8d8;
  width: 100%;

  .sort {
    ${(props) => props.theme.displayFlex('center', 'center')};

    .sort-by {
      margin-right: 20px;
    }
  }
`;

export default ShopToolbar;
