import { useRegisterMutation } from '@src/api/UserAPI';
import Button from '@src/components/Button/Button';
import Input from '@src/components/Input/Input';
import Path from '@src/utils/path';
import { Col, message, Row } from 'antd';
import { Gutter } from 'antd/lib/grid/row';
import { useFormik } from 'formik';
import Link from 'next/link';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { handleAuthentication, initialValue, payload, validationSchema } from './constant';
import { useRouter } from 'next/router';
import { useLazyVerifyAccessTokenQuery } from '@src/api/UserAPI';
import { setUserProfile } from '@src/redux/slices/userSlice';
import dispatch from '@src/utils/dispatch';
import Wrapper from '@src/components/Layout/Wrapper';

const Register: FunctionComponent = () => {
  const { t } = useTranslation();
  const router = useRouter();

  const [register, { isLoading }] = useRegisterMutation();
  const [verifyAccessToken, { data }] = useLazyVerifyAccessTokenQuery();

  const gutter: [Gutter, Gutter] = useMemo(() => [0, 10], []);
  const span = useMemo(() => 24, []);

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      register(payload(values))
        .unwrap()
        .then(async (response) => {
          if (response.message === 'Successful') {
            await handleAuthentication(response);
            await verifyAccessToken({});
            router.push(Path.HOME);
            message.success('Create Account Success');
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

  const handleCreateAccount = () => {
    formik.handleSubmit();
  };

  return (
    <Container>
      <Wrapper className="wrapper">
        <div className="register">
          <div className="register-text mb-30">
            <div className="title mb-5">{t('register.createAccount')}</div>
            <div className="subtitle">{t('register.subtitle')}</div>
          </div>
          <div className="register-form mb-30">
            <Row gutter={gutter}>
              <Col span={span}>
                <Input
                  type="text"
                  label={t('label.firstName')}
                  name="firstName"
                  value={formik.values.firstName}
                  {...reuseProps}
                />
              </Col>
              <Col span={span}>
                <Input
                  type="text"
                  label={t('label.lastName')}
                  name="lastName"
                  value={formik.values.lastName}
                  {...reuseProps}
                />
              </Col>
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
                  type="text"
                  label={t('label.phone')}
                  name="phone"
                  value={formik.values.phone}
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
              <Col span={span}>
                <Input
                  type="password"
                  label={t('label.confirmPassword')}
                  name="confirmPassword"
                  value={formik.values.confirmPassword}
                  {...reuseProps}
                />
              </Col>
            </Row>
          </div>
          <Button
            type="default"
            loading={isLoading}
            className="mb-20"
            onClick={handleCreateAccount}
          >
            {t('register.createAccount')}
          </Button>
          <div className="optional-action">
            <Link href={Path.HOME}>{t('register.returnStore')}</Link>
          </div>
        </div>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  height: 150vh;
  padding: 100px 0;

  .wrapper {
    max-width: 610px !important;
  }

  .register {
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

export default Register;
