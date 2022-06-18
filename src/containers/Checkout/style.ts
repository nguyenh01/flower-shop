import styled from 'styled-components';

const Container = styled.div`
  height: 98vh;

  .wrap {
    display: flex;
    flex: 1 0 auto;
    margin: 0 auto;
    flex-direction: row;
    height: 100%;
  }

  .main {
    flex: 1 0 auto;
  }

  .sidebar {
    position: relative;
    color: #535353;

    &:after {
      content: '';
      display: block;
      width: 300%;
      position: absolute;
      top: 0;
      bottom: 0;
      background: #fafafa;
      z-index: -1;
    }

    .product-list {
      .product {
        ${(props) => props.theme.displayFlex('space-between', 'center')};

        &:not(:last-child) {
          margin-bottom: 20px;
        }
      }

      .product-info {
        ${(props) => props.theme.displayFlex('center', 'center')};

        .ant-badge-count {
          background: rgba(114, 114, 114, 0.9);
        }
      }

      .product-description,
      .product-price {
        color: #323232;
        font-weight: 500;
      }

      .product-thumbnail {
        border-radius: 8px;
        border: 1px solid #e5e5e5;
        overflow: hidden;
        margin-right: 15px;
      }
    }
  }

  .total-line {
    padding: 20px 0;
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;

    .line {
      ${(props) => props.theme.displayFlex('space-between', 'center')};
    }

    .text {
      font-size: 15px;
    }

    .price {
      color: #323232;
      font-weight: 500;
    }
  }

  .total {
    ${(props) => props.theme.displayFlex('space-between', 'center')};

    .text {
      font-size: 16px;
    }

    .price {
      color: #323232;
      ${(props) => props.theme.fontCustom(24, 500, 24)}
      ${(props) => props.theme.displayFlex('center', 'center')};

      .currency {
        color: #717171;
        font-size: 12px;
        line-height: 24px;
        margin-right: 15px;
      }
    }
  }

  .section-header {
    ${(props) => props.theme.displayFlex('space-between', 'center')};

    .section-title {
      color: #333;
      ${(props) => props.theme.fontCustom(18, 400, 23.4)}
    }

    .check-account a {
      color: ${(props) => props.theme.colors.primary};
      opacity: 1;
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 0.5;
      }
    }
  }

  .checkout-form {
    padding: 0 10px;

    .shipping-title {
      color: #333;
      ${(props) => props.theme.fontCustom(18, 400, 23.4)}
    }

    .order-btn {
      background-color: ${(props) => props.theme.colors.primary};
      border-radius: 5px;
      height: 60px;
      margin-right: 20px;
      ${(props) => props.theme.fontCustom(14, 500, 14)};
    }

    .order-place {
      ${(props) => props.theme.displayFlex('flex-start', 'center')};
    }
  }

  @media only screen and (min-width: 1000px) {
    .wrap {
      padding: 0 5%;
      width: 90%;
    }

    .main {
      padding-top: 4em;
      width: 52%;
      padding-right: 6%;
      float: left;
    }

    .sidebar {
      padding-top: 4em;
      width: 38%;
      padding-left: 4%;
      background-position: left top;
      float: right;

      &:after {
        left: 0;
        background-position: left top;
        box-shadow: 1px 0 0 #e1e1e1 inset;
      }
    }
  }
`;

export default Container;
