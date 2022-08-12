import Typography from '@src/components/Typography/Typography';
import useSelector from '@src/utils/useSelector';
import { FunctionComponent, useEffect, useMemo } from 'react';
import styled from 'styled-components';
import Spin from '@src/components/Spin/Spin';
import Input from '@src/components/Input/Input';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import { initialValues, validationSchema } from './constant';
import { Gutter } from 'antd/lib/grid/row';
import Button from '@src/components/Button/Button';
import { Space, Row, Col } from 'antd';
import { useUpdateInfoMutation } from '@src/api/UserAPI';
import useBooleanState from '@src/hooks/useBooleanState';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';

interface AccountFormProps {
  toggle?: () => void;
  showBackButton?: boolean;
  resetForm?: boolean;
  spinColor?: 'pink' | 'blue';
}

const AccountForm: FunctionComponent<AccountFormProps> = ({
  toggle,
  showBackButton = true,
  resetForm = true,
  spinColor = 'pink',
}) => {
  const { t } = useTranslation();
  const { profile } = useSelector((state) => state.userProfile);
  const [updateInfo, { isLoading }] = useUpdateInfoMutation();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [0, 10], []);
  const span = useMemo(() => 24, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      confirmModal.toggle();
    },
  });

  useEffect(() => {
    if (profile) {
      formik.setFieldValue('firstName', profile.firstName);
      formik.setFieldValue('lastName', profile.lastName);
      formik.setFieldValue('phone', profile.phone);
    }
  }, [profile]);

  const reuseProps = {
    onChange: formik.handleChange,
    formik: formik,
    required: true,
  };

  const handleBack = () => {
    if (resetForm) {
      formik.handleReset(formik.values);
    }
    toggle && toggle();
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleConfirm = () => {
    updateInfo(formik.values)
      .unwrap()
      .then(() => {
        confirmModal.toggle();
        successModal.toggle();
      })
      .catch(() => {});
  };

  const handleConfirmSuccess = () => {
    successModal.toggle();
    handleBack();
  };

  return (
    <Container>
      <Typography.Title className="mb-30">{t('myAccount.changeInformation')}</Typography.Title>
      <Spin spinning={!profile.email} spinColor={spinColor}>
        <Row className="mb-30" gutter={gutter}>
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
              label={t('label.phone')}
              name="phone"
              value={formik.values.phone}
              {...reuseProps}
            />
          </Col>
        </Row>
        <Space size={10}>
          {showBackButton && (
            <Button type="default" onClick={handleBack}>
              {t('myAccount.back')}
            </Button>
          )}
          <Button type="default" onClick={handleSubmit}>
            {t('myAccount.updateInfo')}
          </Button>
        </Space>
      </Spin>
      <CustomModal
        type="confirm"
        title="Confirmation"
        description="Do you want to change the information?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirm}
        isConfirmLoading={isLoading}
      />
      <CustomModal
        type="success"
        title="Changed Information Success"
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={handleConfirmSuccess}
        confirmText="Close"
        showCloseIcon={false}
      />
    </Container>
  );
};

const Container = styled.div``;

export default AccountForm;
