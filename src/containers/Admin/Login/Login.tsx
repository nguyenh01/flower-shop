import Input from '@src/components/Input/Input';
import { FunctionComponent, useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '@src/components/Button/Button';
import { useFormik } from 'formik';
import { initialValue, validationSchema } from '@src/containers/Login/constant';
import { message } from 'antd';
import { handleAuthentication } from '@src/containers/Register/constant';
import Path from '@src/utils/path';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import dispatch from '@src/utils/dispatch';
import { setUserProfile } from '@src/redux/slices/userSlice';
import { useLazyVerifyAccessTokenQuery, useLoginMutation } from '@src/api/AuthenticationAPI';
import ReCAPTCHA from 'react-google-recaptcha';

const Login: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();
  const [verifyAccessToken, { data }] = useLazyVerifyAccessTokenQuery();

  const [tokenReCAPTCHA, setTokenReCAPTCHA] = useState<string | null>(null);
  const [countSubmit, setCountSubmit] = useState<number>();

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (value) => {
      if ((countSubmit as number) > 2) {
        if (tokenReCAPTCHA) {
          handleLogin(value);
        } else {
          message.error('Please verify reCAPTCHA');
        }
      } else {
        handleLogin(value);
      }
    },
  });

  const handleLogin = (value: any) => {
    return login(value)
      .unwrap()
      .then(async (response) => {
        if (response.message === 'Successful') {
          await handleAuthentication(response);
          await verifyAccessToken({});
          router.push(Path.HOME);
          message.success('Login Succsess');
        }
      })
      .catch((error) => {
        if (error.data?.message === 'Fail') {
          message.error(error.data.error);
        }
      });
  };

  useEffect(() => {
    setCountSubmit(formik.submitCount);
  }, [formik.submitCount]);

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

  const handleSubmitLogin = () => {
    formik.handleSubmit();
  };

  const handleChangeTokenReCAPCHA = (value: string) => {
    setTokenReCAPTCHA(value);
  };

  return (
    <Container>
      <div className="form-wrapper">
        <div className="form">
          <div className="title mb-15">Login</div>
          <div className="content mb-35">Hello! Login with your account</div>
          <div className="mb-25">
            <Input
              type="text"
              label={t('label.email')}
              name="email"
              value={formik.values.email}
              {...reuseProps}
            />
          </div>
          <div className="mb-25">
            <Input
              type="password"
              label={t('label.password')}
              name="password"
              value={formik.values.password}
              {...reuseProps}
            />
          </div>
          {(countSubmit as number) > 2 && (
            <div className="recapcha mb-25">
              <ReCAPTCHA
                sitekey="6LeSz0gaAAAAACrbGZeaCv7Bmw-CrITup8xR-Cek"
                onChange={handleChangeTokenReCAPCHA as any}
              />
            </div>
          )}
          <Button type="default" className="btn" loading={isLoading} onClick={handleSubmitLogin}>
            {t('menu.login')}
          </Button>
        </div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  min-height: 100vh;
  background-color: rgb(237, 241, 247);
  padding: 36px;

  .form-wrapper {
    display: grid;
    height: calc(100vh - 5rem);
    background-color: #fff;
    border-radius: 0.25rem;
    box-shadow: rgb(44 51 73 / 10%) 0 0.5rem 1rem 0;
  }

  .form {
    margin: auto;
    display: block;
    width: 100%;
    max-width: 35rem;

    .title {
      ${(props) => props.theme.fontCustom(36, 500, 36, 'Roboto')};
      text-align: center;
    }

    .content {
      ${(props) => props.theme.fontCustom(15, 300, 15, 'Roboto')};
      color: rgb(34, 43, 69);
      text-align: center;
    }

    .btn {
      width: 100%;
      letter-spacing: 0.4px;
      border-radius: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
  }
`;

export default Login;
