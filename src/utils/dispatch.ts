import store from '@src/redux/store';

const dispatch = (action: any) => {
  return store.dispatch(action);
};

export default dispatch;
