import useSelector from '@src/utils/useSelector';
import { useEffect } from 'react';
import dispatch from '@src/utils/dispatch';
import { login } from '@src/redux/slices/userSlice';

const useAuthentication = () => {
  const { isAuth } = useSelector((state) => state.userProfile);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuth) {
      const type = localStorage.getItem('type');
      dispatch(login({ type }));
    }
  }, [dispatch]);
};

export default useAuthentication;
