import styled from 'styled-components';

const Wrapper = styled.div`
  width: 100%;
  max-width: 1200px;
  margin-right: auto;
  margin-left: auto;
  padding-right: 15px;
  padding-left: 15px;

  @media only screen and (max-width: 1400px) {
    max-width: 1320px;
  }

  @media only screen and (max-width: 992px) {
    max-width: 960px;
  }

  @media only screen and (max-width: 768px) {
    max-width: 720px;
  }

  @media only screen and (max-width: 576px) {
    max-width: 540px;
  }
`;

export default Wrapper;
