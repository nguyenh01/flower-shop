import styled from 'styled-components';

const Container = styled.div`
  padding: 80px 0;

  .cart-table {
    overflow-x: auto;
  }

  .table {
    text-align: center;
    width: 100%;

    tr {
      th {
        ${(props) => props.theme.fontCustom(15, 700, 24)};
        text-align: center;
        color: #000;
        padding: 15px 20px;
        border: 1px solid ${(props) => props.theme.colors.border};
        text-transform: capitalize;
      }

      td {
        padding: 10px 20px;
        border-color: ${(props) => props.theme.colors.border};
        border-style: solid;
        border-width: 0 1px 1px 1px;

        svg {
          width: 22px;
          height: 22px;
          transition: color 0.3s ease-in-out;
          cursor: pointer;

          &:hover {
            color: ${(props) => props.theme.colors.primary};
          }
        }
      }

      .thumbnail,
      .price,
      .quantity,
      .total,
      .remove {
        width: 177px;
      }
    }

    .product-link a {
      font-weight: 500;
      color: #333;
      text-transform: capitalize;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .product-price {
      font-weight: 600;
    }

    .product-quantity {
      margin: 0 auto;
    }
  }

  .cart-update-option {
    ${(props) => props.theme.displayFlex('space-between', 'center')};
    border: 1px solid ${(props) => props.theme.colors.border};
    padding: 15px 20px;
  }

  .custom-btn {
    background-color: ${(props) => props.theme.colors.primary};

    &:hover {
      background-color: #000;
    }
  }

  .cart-calculate-items {
    width: 50%;
    background-color: #f8f8f8;
    font-weight: 500;
    color: #333;
    margin-left: auto;

    .calculate-title {
      padding: 27px 15px 25px;
      font-size: 18px;
    }

    .calculate-table {
      width: 100%;

      td {
        color: #333;
        padding: 15px 20px;
      }

      .total-amount,
      .subtotal {
        text-align: right;
      }

      .total {
        border-top: 1px solid ${(props) => props.theme.colors.border};

        .total-amount {
          color: ${(props) => props.theme.colors.primary};
          font-weight: 700;
        }
      }
    }

    .custom-btn {
      width: 100%;
    }
  }
`;

export default Container;
