import { Fragment, FunctionComponent, useEffect, useMemo, useState } from 'react';
import Container from '@src/containers/Checkout/style';
import Logo from '@src/components/Logo/Logo';
import Link from 'next/link';
import Path from '@src/utils/path';
import { Gutter } from 'antd/lib/grid/row';
import { Badge, Col, Image, Row } from 'antd';
import Input from '@src/components/Input/Input';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { initialValues, payload, validationSchema } from '@src/containers/Checkout/constant';
import Select from '@src/components/Select/Select';
import {
  useGetDistrictQuery,
  useGetProvinceQuery,
  useGetShipFeeMutation,
  useGetWardQuery,
} from '@src/api/LocationAPI';
import useSelector from '@src/utils/useSelector';
import { CartResponse } from '@src/api/model/cart.data-model';
import formatAmount from '@src/utils/formatAmount';
import Button from '@src/components/Button/Button';
import useBooleanState from '@src/hooks/useBooleanState';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import { useCreateOrderMutation } from '@src/api/OrderAPI';
import { OrderFormik } from '@src/api/model/order.data-model';
import { useRouter } from 'next/router';
import { handleClearCart } from '../Product/ProductCookie';
import dispatch from '@src/utils/dispatch';
import { CartAPI } from '@src/api/CartAPI';
import host from '@src/utils/host';

interface CheckoutProps {
  cart: CartResponse;
}

interface FullAddress {
  province?: string;
  district?: string;
  ward?: string;
}

const initialFullAddressValue = {
  province: '',
  district: '',
  ward: '',
};

const Checkout: FunctionComponent<CheckoutProps> = ({ cart }) => {
  const { t } = useTranslation();

  const router = useRouter();
  const { isAuth, profile } = useSelector((state) => state.userProfile);

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();
  const failedModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [12, 15], []);
  const span = useMemo(() => 24, []);

  const subtotal = cart?.listShoppingCartDetail?.reduce(
    (prevValue, currentValue) => prevValue + currentValue.unit_price * currentValue.quantity,
    0
  );
  const cartItem = cart?.listShoppingCartDetail?.map((item) => ({
    id: item.product_id,
    name: item.product_name,
    quantity: item.quantity,
  }));

  const [shippingFee, setShippingFee] = useState(0);
  const [fullAddress, setFullAddress] = useState<FullAddress>(initialFullAddressValue);
  const [failMessage, setFailMessage] = useState<string>('');

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      confirmModal.toggle();
    },
  });

  const province = formik.values.province;
  const district = formik.values.district;
  const ward = formik.values.ward;
  const address = formik.values.address;

  const { data: provinces } = useGetProvinceQuery({});
  const { data: districts } = useGetDistrictQuery({ id: province }, { skip: !province });
  const { data: wards } = useGetWardQuery({ id: district }, { skip: !district });

  const [getShipFee] = useGetShipFeeMutation();
  const [createOrder, { isLoading: isCreateOrderLoading }] = useCreateOrderMutation();

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
    if (provinces && province) {
      const getProvinceName = provinces.result.find((item) => item.ProvinceID === province);
      setFullAddress((prev) => ({ ...prev, province: getProvinceName?.ProvinceName }));
    }
  }, [provinces, province]);

  useEffect(() => {
    formik.setFieldValue('ward', undefined);
    formik.setFieldValue('address', '');
  }, [district]);

  useEffect(() => {
    if (districts && district) {
      const getDistrictName = districts.result.find((item) => item.DistrictID === district);
      setFullAddress((prev) => ({ ...prev, district: getDistrictName?.DistrictName }));
    }
  }, [districts, district]);

  useEffect(() => {
    if (wards && ward) {
      const getWardName = wards.result.find((item) => item.WardCode === ward);
      setFullAddress((prev) => ({ ...prev, ward: getWardName?.WardName }));
    }
  }, [wards, ward]);

  useEffect(() => {
    if (province && district && ward) {
      getShipFee({
        to_district_id: district,
        to_ward_code: ward,
      })
        .unwrap()
        .then((response) => setShippingFee(response.result.ship_fee))
        .catch(() => setShippingFee(0));
    }
  }, [province, district, ward]);

  const handleOrder = () => {
    formik.handleSubmit();
  };

  const handleConfirmOrder = (values: OrderFormik) => {
    const full_address = `${address}, ${fullAddress?.ward}, ${fullAddress?.district}, ${fullAddress?.province}`;
    createOrder({
      item: cartItem,
      full_address: full_address,
      ...payload(values),
    })
      .unwrap()
      .then(async () => {
        confirmModal.toggle();
        await dispatch(CartAPI.util.invalidateTags(['CART']));
        successModal.toggle();
      })
      .catch((error) => {
        if (error.status === 400) {
          setFailMessage(error.data.msg);
          confirmModal.toggle();
          failedModal.toggle();
        }
      });
  };

  const handleConfirmSuccess = () => {
    if (isAuth) {
      router.push(Path.MY_ACCOUNT);
    } else {
      handleClearCart();
      router.push(Path.MY_ACCOUNT);
    }
  };

  return (
    <Container>
      <div className="wrap">
        <div className="main">
          <div className="header mb-30">
            <Logo />
          </div>
          <div className="section-header mb-20">
            <div className="section-title">{t('checkout.contactInfo')}</div>
            {!isAuth && (
              <div className="check-account">
                {t('checkout.haveAccount')} <Link href={Path.LOGIN}>{t('menu.login')}</Link>
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
                  {...reuseProps}
                />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  label={t('label.firstName')}
                  name="firstName"
                  value={formik.values.firstName}
                  {...reuseProps}
                />
              </Col>
              <Col span={12}>
                <Input
                  type="text"
                  label={t('label.lastName')}
                  name="lastName"
                  value={formik.values.lastName}
                  {...reuseProps}
                />
              </Col>
              <Col className="mb-35" span={span}>
                <Input
                  type="text"
                  label={t('label.phone')}
                  name="phone"
                  value={formik.values.phone}
                  {...reuseProps}
                />
              </Col>
              <Col className="shipping-title" span={span}>
                {t('checkout.shippingAddress')}
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
                  options={provinces?.result?.map((item) => ({
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
                    options={districts?.result?.map((item) => ({
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
                      options={wards?.result?.map((item) => ({
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
                  onChange={formik.handleChange}
                />
              </Col>
              <Col className="order-place" span={span}>
                <Button className="order-btn" type="secondary" onClick={handleOrder}>
                  {t('checkout.completeOrder')}
                </Button>
                <Link href={Path.CART}>{t('checkout.returnCart')}</Link>
              </Col>
            </Row>
          </div>
        </div>
        <div className="sidebar">
          <div className="product-list mt-10 mb-20">
            {cart?.listShoppingCartDetail?.map((item) => (
              <div className="product" key={item._id}>
                <div className="product-info">
                  <Badge count={item.quantity} offset={[-13, 0]}>
                    <div className="product-thumbnail">
                      <Image
                        src={`${host}${item.imageList[0]}`}
                        width={65}
                        alt="img"
                        preview={false}
                      />
                    </div>
                  </Badge>
                  <div className="product-description">{item.product_name}</div>
                </div>
                <div className="product-price">{formatAmount(item.unit_price)}</div>
              </div>
            ))}
          </div>
          <div className="total-line mb-25">
            <div className="line mb-10">
              <div className="text">{t('cart.subTotal')}</div>
              <div className="price">{formatAmount(subtotal)}</div>
            </div>
            <div className="line">
              <div className="text">{t('myAccount.shipFee')}</div>
              <div className="price">{formatAmount(shippingFee)}</div>
            </div>
          </div>
          <div className="total">
            <div className="text">{t('myAccount.totalPayment')}</div>
            <div className="price">
              <span className="currency">VND</span>
              <div>{formatAmount(subtotal + shippingFee)}</div>
            </div>
          </div>
        </div>
      </div>
      <CustomModal
        type="confirm"
        title="Confirmation"
        description="Please double check your order and select confirm!"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={() => handleConfirmOrder(formik.values)}
        isConfirmLoading={isCreateOrderLoading}
      />
      <CustomModal
        type="success"
        title="Order Success"
        description="Your order has been successfully placed. Please track your order!"
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={handleConfirmSuccess}
        confirmText="Close"
        showCloseIcon={false}
      />
      <CustomModal
        type="delete"
        title="Cannot Order"
        description={failMessage}
        showCloseButton={false}
        visible={failedModal.visible}
        onClose={failedModal.toggle}
        onConfirm={failedModal.toggle}
        confirmText="Close"
        showCloseIcon={false}
      />
    </Container>
  );
};

export default Checkout;
