import useSelector from '@src/utils/useSelector';
import { useEffect } from 'react';
import dispatch from '@src/utils/dispatch';
import { login, setUserProfile } from '@src/redux/slices/userSlice';
import { useVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';

const useAuthentication = () => {
  const { isAuth } = useSelector((state) => state.userProfile);
  const { data } = useVerifyAccessTokenQuery({}, { skip: !isAuth });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && !isAuth) {
      const type = Number(localStorage.getItem('type'));
      dispatch(login({ type }));
    }
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      const payload = {
        email: data.user?.email,
        firstName: data.user?.firstName,
        lastName: data.user?.lastName,
        phone: data.user?.phone,
        id: data.user?._id,
      };
      localStorage.setItem('user_id', data.user?._id);
      dispatch(setUserProfile(payload));
    }
  }, [data]);
};

export default useAuthentication;
