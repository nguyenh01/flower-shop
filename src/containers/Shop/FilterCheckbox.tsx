import { FunctionComponent } from 'react';
import styled from 'styled-components';
import Checkbox, { option } from '@src/components/Checkbox/Checkbox';

interface FilterCheckboxProps {
  className?: string;
  title: string;
  options: option[];
  name?: string;
  value?: string[];
  onChange?: (event: any) => void;
}

const FilterCheckbox: FunctionComponent<FilterCheckboxProps> = ({ className, title, ...props }) => {
  return (
    <Container className={className}>
      <div className="title">{title}</div>
      <div className="checkbox-group">
        <Checkbox type="group" {...props} />
      </div>
    </Container>
  );
};

const Container = styled.div`
  .title {
    padding-bottom: 12px;
    margin-bottom: 30px;
    border-bottom: 2px solid ${(props) => props.theme.colors.gray};
    ${(props) => props.theme.fontCustom(22, 700, 22, 'Jura, serif')};
  }
`;

export default FilterCheckbox;
