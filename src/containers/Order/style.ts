import styled from 'styled-components';

const Container = styled.div`
  .back {
    ${(props) => props.theme.displayFlex('flex-start', 'center')};
    width: fit-content;
    font-size: 16px;
    cursor: pointer;
    background-color: #d3d3d3;
    padding: 5px 10px;
    border-radius: 8px;
    transition: all 0.3s ease-in-out;

    .back-icon {
      width: 25px;
      height: 25px;
      margin-right: 8px;
    }

    &:hover {
      color: ${(props) => props.theme.colors.primary};
      background-color: transparent;
    }
  }

  .order-item {
    ${(props) => props.theme.displayFlex('flex-start', 'center')};
    width: 100%;
    height: 60px;
    padding: 0 10px;
    border-radius: 4px;
    background-color: #d8d8d8;

    .item {
      width: 25%;

      &.code {
        cursor: pointer;
        transition: all 0.3s ease-in-out;

        &:hover {
          text-decoration: underline;
          color: ${(props) => props.theme.colors.primary};
        }
      }

      &.status,
      &.price {
        text-align: center;
      }

      &.status {
        text-transform: capitalize;
      }
    }
  }

  .not-order {
    text-transform: unset;
  }

  .order-detail {
    ${(props) => props.theme.displayFlex('space-between', 'center')};

    &:not(:last-child) {
      margin-bottom: 15px;
    }

    .label {
      width: 25%;
    }
  }

  .order-info-title {
    margin-top: 50px;
    text-transform: uppercase;
    font-size: 18px;
  }

  .total-payment {
    font-size: 16px;
    font-weight: 600;
    color: ${(props) => props.theme.colors.primary};
  }

  .btn-confirmation {
    margin-left: auto;
    margin-top: 50px;
  }
`;

export default Container;
