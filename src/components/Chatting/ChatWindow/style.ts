import styled from 'styled-components';

const Container = styled.div`
  position: fixed;
  right: 60px;
  bottom: 0px;

  width: 338px;
  height: 570px;
  border-radius: 8px 8px 0 0;
  background-color: #fff;
  box-shadow: 0 0 8rem 0 rgb(0 0 0 / 10%), 0rem 2rem 4rem -3rem rgb(0 0 0 / 50%);

  .chat-header {
    ${(props) => props.theme.displayFlex('space-between', 'center')};

    height: 60px;
    border-radius: 8px 8px 0 0;
    padding: 8px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1), 0 -1px rgba(0, 0, 0, 0.1) inset,
      0 2px 1px -1px rgba(255, 255, 255, 0.5) inset;
  }

  .close {
    display: grid;
    place-items: center;

    width: 26px;
    height: 26px;
    cursor: pointer;
    transition: all 0.3s ease-in-out;

    .close-icon {
      width: 24px;
      height: 24px;
      fill: #bcc0c4;
    }

    &:hover {
      border-radius: 50%;
      background-color: #f2f2f2;
    }
  }

  .info {
    ${(props) => props.theme.displayFlex('flex-start', 'center')};

    .avatar {
      margin-right: 10px;
    }

    .name {
      margin-right: 5px;
      font-size: 15px;
      font-weight: 500;
    }
  }

  .messages {
    height: 446px;
    padding: 16px;
    background-color: #f7f7f7;
    overflow-y: auto;
    box-shadow: inset 0 32px 32px -32px rgb(0 0 0 / 5%), inset 0 -32px 32px -32px rgb(0 0 0 / 5%);

    .date {
      font-size: 12px;
      background: #eee;
      padding: 4px 16px;
      border-radius: 2rem;
      color: #999;
      margin: 0 auto;
      width: fit-content;
    }

    .message {
      padding: 8px 16px;
      min-height: 36px;
      width: fit-content;
      max-width: 66%;
      box-shadow: 0 0 32px rgb(0 0 0 / 8%), 0 16px 16px -16px rgb(0 0 0 / 10%);

      &.me {
        background-color: ${(props) => props.theme.colors.primary};
        margin: 14px 14px 4px auto;
        border-radius: 18px 18px 0 18px;
        color: #fff;
      }

      &.service {
        border-radius: 18px 18px 18px 0;
        background-color: #fff;
        margin: 14px auto 4px 14px;

        .typing {
          display: inline-block;
          width: 0.8rem;
          height: 0.8rem;
          margin-right: 0rem;
          box-sizing: border-box;
          background: #ccc;
          border-radius: 50%;

          &.typing-1 {
            animation: typing 1.5s infinite;
          }

          &.typing-2 {
            animation: typing 1.5s 250ms infinite;
          }

          &.typing-3 {
            animation: typing 1.5s 500ms infinite;
          }

          @keyframes typing {
            0%,
            75%,
            100% {
              transform: translate(0, 0.25rem) scale(0.9);
              opacity: 0.5;
            }

            25% {
              transform: translate(0, -0.25rem) scale(1);
              opacity: 1;
            }
          }
        }
      }
    }

    .time {
      font-size: 12px;
      color: #999;

      &.me {
        margin: 0 16px 8px auto;
        text-align: right;
      }

      &.service {
        margin: 0 auto 8px 16px;
        text-align: left;
      }
    }
  }

  .sending {
    height: 64px;
    display: flex;
    align-items: center;
    padding: 0 8px;

    .input {
      width: 85%;
      height: 34px;
      padding: 8px 16px;
      border-radius: 18px;
      letter-spacing: 0.4px;
      box-shadow: 0 0 1rem rgb(0 0 0 / 10%), 0rem 1rem 1rem -1rem rgb(0 0 0 / 20%);
    }

    .send {
      width: 15%;
      display: grid;
      place-items: center;

      .send-icon {
        width: 20px;
        height: 20px;
        transition: all 0.3s ease-in-out;
        cursor: pointer;

        &:hover {
          fill: ${(props) => props.theme.colors.primary};
        }
      }
    }
  }
`;

export default Container;
