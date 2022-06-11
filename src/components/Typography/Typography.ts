import styled from 'styled-components';

const Label = styled.span`
  color: #000;
  margin-bottom: 5px;
  ${(props) => props.theme.fontCustom(14, 500, 14)};
  text-transform: capitalize;

  .required-mark {
    color: ${({ theme }) => theme.colors.red};
  }
`;

const SectionTitle1 = styled.div`
  ${(props) => props.theme.fontCustom(22, 600, 34, 'Great Vibes, cursive')};
  color: ${(props) => props.theme.colors.primary};
  letter-spacing: 3px;
  text-transform: capitalize;
`;

const SectionTitle2 = styled.div`
  ${(props) => props.theme.fontCustom(80, 600, 100, 'Josefin Slab,serif')};
  color: #000;
  text-transform: capitalize;
`;

const SectionTitle3 = styled.div`
  ${(props) => props.theme.fontCustom(36, 700, 36, 'Josefin Slab,serif')};
  color: #000;
  text-transform: uppercase;
`;

const Typography = {
  Label,
  SectionTitle1,
  SectionTitle2,
  SectionTitle3,
};

export default Typography;
