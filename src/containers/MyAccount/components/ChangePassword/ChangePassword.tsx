import Button from '@src/components/Button/Button';
import Input from '@src/components/Input/Input';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import Typography from '@src/components/Typography/Typography';
import useBooleanState from '@src/hooks/useBooleanState';
import Col from 'antd/lib/grid/col';
import Row, { Gutter } from 'antd/lib/grid/row';
import { useFormik } from 'formik';
import { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';
import { initialValues, validationSchema } from './constant';

interface ChangePasswordFormik {
  current_password: string;
  new_password: string;
  confirm_new_password: string;
}

const ChangePassword: FunctionComponent = () => {
  const { t } = useTranslation();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [0, 20], []);
  const span = useMemo(() => 24, []);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: validationSchema,
    onSubmit: () => {
      confirmModal.toggle();
    },
  });

  const reuseProps = {
    onChange: formik.handleChange,
    formik: formik,
    required: true,
  };

  const handleSubmitChangePassword = () => {
    formik.handleSubmit();
  };

  const handleConfirmOrder = (values: ChangePasswordFormik) => {
    console.log(values);
    confirmModal.toggle();
    formik.handleReset(values);
  };

  return (
    <Container>
      <Typography.Title className="mb-30">change password</Typography.Title>
      <Row className="mb-30" gutter={gutter}>
        <Col span={span}>
          <Input
            type="password"
            label={t('label.currentPassword')}
            name="current_password"
            value={formik.values.current_password}
            {...reuseProps}
          />
        </Col>
        <Col span={span}>
          <Input
            type="password"
            label={t('label.newPassword')}
            name="new_password"
            value={formik.values.new_password}
            {...reuseProps}
          />
        </Col>
        <Col span={span}>
          <Input
            type="password"
            label={t('label.confirmNewPassword')}
            name="confirm_new_password"
            value={formik.values.confirm_new_password}
            {...reuseProps}
          />
        </Col>
      </Row>
      <Button type="default" onClick={handleSubmitChangePassword}>
        Change
      </Button>
      <ModalConfirm
        type="confirm"
        title="Change Password Confirmation"
        description="Do you want to change your password?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={() => handleConfirmOrder(formik.values)}
        //isConfirmLoading={isCreateOrderLoading}
      />
      <ModalConfirm
        type="success"
        title="Change Password Success"
        description="Your password has been changed"
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        //onConfirm={handleConfirmSuccess}
        confirmText="Close"
        showCloseIcon={false}
      />
    </Container>
  );
};

const Container = styled.div``;

export default ChangePassword;