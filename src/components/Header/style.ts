import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  width: 100%;
  z-index: 10;

  background-color: #fff;
  box-shadow: 0 1px 5px #0003;

  padding: 0px 50px;

  .nav {
    ${(props) => props.theme.displayFlex('center', 'center')};
    padding: 30px 0;

    .item {
      padding: 8px 16px;
      cursor: pointer;
      text-transform: uppercase;
      ${(props) => props.theme.fontCustom(15, 600, 18)};
      transition: color 0.3s ease-in-out;

      &:hover {
        color: ${(props) => props.theme.colors.primary};
      }

      &:not(:last-child) {
        margin-right: 32px;
      }
    }
  }

  .header-right {
    ${(props) => props.theme.displayFlex('flex-end', 'center')};

    .ant-badge-count {
      background: ${(props) => props.theme.colors.primary};
    }

    .cart-icon,
    .search-icon,
    .language-icon {
      cursor: pointer;
      transition: all 0.4s ease-in-out;

      &:hover {
        fill: ${(props) => props.theme.colors.primary};
        color: ${(props) => props.theme.colors.primary};
      }
    }

    .cart-wrap {
      margin-right: 30px;

      .cart-icon {
        width: 22px;
        height: 22px;
      }
    }

    .search-wrap {
      margin-right: 28px;

      .search-icon {
        width: 22px;
        height: 22px;
      }
    }

    .language-wrap {
      .language-icon {
        width: 22px;
        height: 22px;
      }
    }

    .user-wrap {
      margin-right: 28px;

      .popover-wrapper {
        cursor: pointer;

        .user-icon {
          transition: fill 0.4s ease-in-out;
        }

        .user-name {
          transition: color 0.4s ease-in-out;
        }

        & > span {
          display: flex;
          justify-content: center;
        }
      }

      .popover-wrapper:hover {
        .user-icon {
          fill: ${(props) => props.theme.colors.primary};
        }

        .user-name {
          color: ${(props) => props.theme.colors.primary};
        }
      }

      .wrapper {
        margin-right: 8px;
      }

      .user-icon {
        width: 22px;
        height: 22px;
      }
    }
  }

  .search-wrap {
    padding: 0px;
  }
`;

export default Container;
