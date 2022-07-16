import { isRejectedWithValue, Middleware } from '@reduxjs/toolkit';
import { message } from 'antd';
import router from 'next/router';

export const statusCodeErrorMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    switch (action.payload.status) {
      case 403:
        router.push('/404');
        break;
      default:
        if (action.payload.status >= 500) {
          message.error({
            key: 500,
            content: 'Internal server error, please try again later',
          });
        }
        break;
    }
  }
  return next(action);
};
