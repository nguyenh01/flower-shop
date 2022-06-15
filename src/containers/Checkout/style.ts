import styled from 'styled-components';

const Container = styled.div`
  .wrap {
    display: flex;
    flex: 1 0 auto;
    margin: 0 auto;
    flex-direction: row;
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
