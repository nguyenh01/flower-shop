import { useLoginMutation } from '@src/api/AuthenticationAPI';
import Button from '@src/components/Button/Button';
import Input from '@src/components/Input/Input';
import Path from '@src/utils/path';
import { Col, Row, message } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import { useFormik } from 'formik';
import Link from 'next/link';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { initialValue, validationSchema } from './constant';
import cookie from 'js-cookie';
import { useLazyVerifyAccessTokenQuery } from '@src/api/AuthenticationAPI';
import { useRouter } from 'next/router';
import dispatch from '@src/utils/dispatch';
import { setUserProfile, login as loginSlice } from '@src/redux/slices/userSlice';
import Wrapper from '@src/components/Layout/Wrapper';

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [verifyAccessToken, { data }] = useLazyVerifyAccessTokenQuery();

  const gutter: [Gutter, Gutter] = useMemo(() => [0, 10], []);
  const span = useMemo(() => 24, []);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (value) => {
      login(value)
        .unwrap()
        .then(async (response) => {
          if (response.message === 'Successful') {
            const convertTypeToString = response.type + '';
            cookie.set('token', response.token, { expires: 2 });
            localStorage.setItem('token', response.token);
            localStorage.setItem('type', convertTypeToString);
            dispatch(loginSlice({ type: response.type }));
            await verifyAccessToken({});
            const { redirectPath } = router.query;
            router.push(redirectPath ? String(redirectPath) : '/');
            message.success('Login Succsess');
          }
        })
        .catch((error) => {
          if (error.data?.message === 'Fail') {
            message.error(error.data.error);
          }
        });
    },
  });

  useEffect(() => {
    if (data) {
      const payload = {
        email: data.user.email,
        firstName: data.user.firstName,
        lastName: data.user.lastName,
        phone: data.user.phone,
        id: data.user._id,
      };
      dispatch(setUserProfile(payload));
    }
  }, [data]);

  const reuseProps = {
    onChange: formik.handleChange,
    formik: formik,
    required: true,
  };

  const handleLogin = () => {
    formik.handleSubmit();
  };

  return (
    <Container>
      <Wrapper className="wrapper">
        <div className="login">
          <div className="login-text mb-30">
            <div className="title mb-5">{t('menu.login')}</div>
            <div className="subtitle">{t('login.subtitle')}</div>
          </div>
          <div className="login-form mb-30">
            <Row gutter={gutter}>
              <Col span={span}>
                <Input
                  type="text"
                  label={t('label.email')}
                  name="email"
                  value={formik.values.email}
                  {...reuseProps}
                />
              </Col>
              <Col span={span}>
                <Input
                  type="password"
                  label={t('label.password')}
                  name="password"
                  value={formik.values.password}
                  {...reuseProps}
                />
              </Col>
            </Row>
          </div>
          <Button type="default" className="mb-20" loading={isLoading} onClick={handleLogin}>
            {t('menu.login')}
          </Button>
          <div className="optional-action">
            <Link href={Path.REGISTER}>{t('login.createAccount')}</Link>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  padding: 100px 0;

  .wrapper {
    max-width: 610px !important;
  }

  .login {
    background: #f3f3f3;
    padding: 37px 40px;

    &-text {
      text-align: center;

      .title {
        ${(props) => props.theme.fontCustom(30, 500, 30)};
        color: #333;
        text-transform: capitalize;
      }

      .subtitle {
        ${(props) => props.theme.fontCustom(15, 400, 24)};
        color: #666;
      }
    }
  }
`;

export default Login;
