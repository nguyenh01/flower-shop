import { Fragment, FunctionComponent, useEffect, useMemo } from 'react';
import Container from '@src/containers/Checkout/style';
import Logo from '@src/components/Logo/Logo';
import Link from 'next/link';
import Path from '@src/utils/path';
import { Gutter } from 'antd/lib/grid/row';
import { Col, Row } from 'antd';
import Input from '@src/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { initialValues } from '@src/containers/Checkout/constant';
import Select from '@src/components/Select/Select';
import { useGetDistrictQuery, useGetProvinceQuery, useGetWardQuery } from '@src/api/LocationAPI';
import useSelector from '@src/utils/useSelector';

const Checkout: FunctionComponent = () => {
  const { t } = useTranslation();
  const { isAuth, profile } = useSelector((state) => state.userProfile);

  const gutter: [Gutter, Gutter] = useMemo(() => [12, 15], []);
  const span = useMemo(() => 24, []);

  const formik = useFormik({
    initialValues: initialValues,
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const { data: provinces } = useGetProvinceQuery({});

  const province = formik.values.province;
  const { data: districts } = useGetDistrictQuery({ id: province }, { skip: !province });

  const district = formik.values.district;
  const { data: wards } = useGetWardQuery({ id: district }, { skip: !district });

  const reuseProps = {
    onChange: formik.handleChange,
    formik: formik,
    required: true,
  };

  useEffect(() => {
    formik.setFieldValue('email', profile?.email);
    formik.setFieldValue('firstName', profile?.firstName);
    formik.setFieldValue('lastName', profile?.lastName);
    formik.setFieldValue('phone', profile?.phone);
  }, [profile]);

  useEffect(() => {
    formik.setFieldValue('district', undefined);
    formik.setFieldValue('ward', undefined);
    formik.setFieldValue('address', '');
  }, [province]);

  useEffect(() => {
    formik.setFieldValue('ward', undefined);
    formik.setFieldValue('address', '');
  }, [district]);

  return (
    <Container>
      <div className="wrap">
        <div className="main">
          <div className="header mb-30">
            <Logo />
          </div>
          <div className="section-header mb-20">
            <div className="section-title">Contact information</div>
            {!isAuth && (
              <div className="check-account">
                Already have an account? <Link href={Path.LOGIN}>Log in</Link>
              </div>
            )}
          </div>
          <div className="checkout-form">
            <Row gutter={gutter}>
              <Col span={span}>
                <Input
                  type="text"
                  label={t('label.email')}
                  name="email"
                  value={formik.values.email}
                  disabled={isAuth}
                  {...reuseProps}
                />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  label={t('label.firstName')}
                  name="firstName"
                  value={formik.values.firstName}
                  disabled={isAuth}
                  {...reuseProps}
                />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  label={t('label.lastName')}
                  name="lastName"
                  value={formik.values.lastName}
                  disabled={isAuth}
                  {...reuseProps}
                />
              </Col>
              <Col className="mb-35" span={span}>
                <Input
                  type="text"
                  label={t('label.phone')}
                  name="phone"
                  value={formik.values.phone}
                  disabled={isAuth}
                  {...reuseProps}
                />
              </Col>
              <Col className="shipping-title" span={span}>
                Shipping address
              </Col>
              <Col span={span}>
                <Select
                  showSearch
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  placeholder="Select Province"
                  label={t('label.province')}
                  name="province"
                  value={formik.values.province}
                  options={provinces?.result.map((item) => ({
                    key: item.ProvinceID,
                    value: item.ProvinceID,
                    render: () => item.ProvinceName,
                  }))}
                  {...reuseProps}
                />
              </Col>
              {province && (
                <Col span={span}>
                  <Select
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                    label={t('label.district')}
                    name="district"
                    placeholder="Select District"
                    value={formik.values.district}
                    options={districts?.result.map((item) => ({
                      key: item.DistrictID,
                      value: item.DistrictID,
                      render: () => item.DistrictName,
                    }))}
                    {...reuseProps}
                  />
                </Col>
              )}
              {wards && (
                <Fragment>
                  <Col span={span}>
                    <Select
                      showSearch
                      optionFilterProp="children"
                      filterOption={(input, option) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                      label={t('label.ward')}
                      name="ward"
                      placeholder="Select Ward"
                      value={formik.values.ward}
                      options={wards?.result.map((item) => ({
                        key: item.WardCode,
                        value: item.WardCode,
                        render: () => item.WardName,
                      }))}
                      {...reuseProps}
                    />
                  </Col>
                  <Col span={span}>
                    <Input
                      type="text"
                      label={t('label.address')}
                      name="address"
                      value={formik.values.address}
                      {...reuseProps}
                    />
                  </Col>
                </Fragment>
              )}
              <Col span={span}>
                <Input
                  type="textarea"
                  label={t('label.note')}
                  name="note"
                  value={formik.values.note}
                  {...reuseProps}
                />
              </Col>
            </Row>
          </div>
        </div>
        <div className="sidebar">456</div>
      </div>
    </Container>
  );
};

export default Checkout;
