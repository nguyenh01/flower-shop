import { FunctionComponent, useState } from 'react';
import styled from 'styled-components';
import Select from '@src/components/Select/Select';
import { optionsSortBy } from '@src/containers/Shop/constant';
import { useTranslation } from 'react-i18next';

interface ShopToolbarProps {
  onChange: (value: string) => void;
}

const ShopToolbar: FunctionComponent<ShopToolbarProps> = ({ onChange }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState<string>('a-z');

  const handleChange = (event: any) => {
    onChange && onChange(event.target.value);
    setValue(event.target.value);
  };

  return (
    <Container className="mb-30">
      <div className="shop-layout"></div>
      <div className="sort">
        <div className="sort-by">{t('shop.sortBy')}</div>
        <Select
          name="sort"
          value={value}
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
