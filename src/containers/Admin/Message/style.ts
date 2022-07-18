import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  width: 100%;
  box-shadow: 0 10px 20px rgb(0 0 0 / 19%), 0 6px 6px rgb(0 0 0 / 23%);

  .discussions {
    width: 35%;
    height: 700px;
    box-shadow: 0px 8px 10px rgba(0, 0, 0, 0.2);
    overflow: hidden;
    display: inline-block;

    .user-list {
      height: 610px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f6f6f6;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }
    }

    .discussion {
      width: 100%;
      height: 90px;
      background-color: #fafafa;
      border-bottom: solid 1px #e0e0e0;
      display: flex;
      align-items: center;
      cursor: pointer;

      &.message-active {
        background-color: #fff;
        border-bottom: solid 1px #e0e0e0;
        border-right: 5px solid ${(props) => props.theme.colors.blue};
      }

      &.not-rep {
        background: #d7f3ff;
      }

      .avatar {
        margin-left: 20px;
        width: 45px !important;
        height: 45px !important;

        .ant-avatar-string {
          line-height: 45px !important;
        }
      }

      .desc-contact {
        height: 43px;
        width: 50%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .name {
        color: #515151;
        margin: 0 0 0 6px;

        &.not-rep {
          font-weight: 600;
        }
      }

      .message {
        margin: 4px 0 0 6px;
        font-size: 12px;
        color: #515151;
      }
    }
  }

  .chat {
    width: 65%;

    .header-chat {
      background-color: #fff;
      height: 90px;
      box-shadow: 0px 3px 2px rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;

      .icon {
        margin-left: 30px;
        color: #515151;
        font-size: 18px;
      }

      .name {
        margin: 0 0 0 20px;
        text-transform: uppercase;
        color: #515151;
        font-size: 17px;
      }
    }

    .messages-chat {
      height: 523px;
      padding: 25px 35px;
      overflow-y: scroll;

      &::-webkit-scrollbar {
        width: 10px;
      }

      &::-webkit-scrollbar-track {
        background: #f6f6f6;
      }

      &::-webkit-scrollbar-thumb {
        background: #888;
        border-radius: 8px;
      }

      &::-webkit-scrollbar-thumb:hover {
        background: #555;
      }

      .date {
        font-size: 12px;
        background: #eee;
        padding: 4px 16px;
        border-radius: 2rem;
        color: #999;
        margin: 0 auto 10px auto;
        width: fit-content;
      }

      .message {
        display: flex;
        align-items: center;
        margin-bottom: 8px;

        .avatar {
          width: 45px !important;
          height: 45px !important;
          margin-right: 0px !important;

          .ant-avatar-string {
            line-height: 45px !important;
          }
        }

        .text {
          margin: 0 35px;
          background-color: #f6f6f6;
          padding: 15px;
          border-radius: 12px;
        }

        &.text-only {
          margin-left: 45px;
        }
      }

      .response {
        float: right;
        margin-right: 0px !important;
        margin-left: auto;

        .text {
          background-color: #e3effd !important;
        }
      }

      .time {
        font-size: 10px;
        color: lightgrey;
        margin-bottom: 10px;
        margin-left: 85px;

        &.me {
          margin-right: 35px;
          text-align: right;
        }
      }
    }

    .footer-chat {
      padding: 0 40px;
      height: 87px;
      display: flex;
      align-items: center;
      background-color: transparent;
      border-top: 2px solid #eee;

      .write-message {
        border: unset;

        &:focus {
          border: unset;
          box-shadow: unset;
        }
      }

      .send-message {
        ${(props) => props.theme.displayFlex('center', 'center')};
        color: #fff;
        background-color: ${(props) => props.theme.colors.blue};
        padding: 12px;
        border-radius: 50px;
        margin-left: 30px;
        width: 45px;
        height: 45px;
        cursor: pointer;

        .send-icon {
          width: 35px;
          height: 35px;

          path {
            stroke: #fff;
          }
        }
      }
    }
  }
`;

export default Container;
