import useBooleanState from '@src/hooks/useBooleanState';
import Path from '@src/utils/path';
import Row, { Gutter } from 'antd/lib/grid/row';
import { useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useMemo } from 'react';
import { InitialValueCategoryAndMaterialFormik } from '../data-model';
import { FormContainer } from '@src/containers/Admin/Product/ProductForm';
import { Col, Space } from 'antd';
import Input from '@src/components/Input/Input';
import Button from '@src/components/Button/Button';
import CustomModal from '@src/components/ModalConfirm/ModalConfirm';
import { usePostMaterialMutation, usePutMaterialMutation } from '@src/api/MaterialAPI';
import { validationSchema } from './constant';

interface MaterialFormProps {
  type: 'create' | 'update';
  initialValue: InitialValueCategoryAndMaterialFormik;
  materialId?: string;
}

const MaterialForm: FunctionComponent<MaterialFormProps> = ({ type, initialValue, materialId }) => {
  const isCreateForm = type === 'create';
  const isUpdateForm = type === 'update';
  const router = useRouter();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [20, 20], []);

  const [postMaterial, { isLoading: isPostLoading }] = usePostMaterialMutation();
  const [putMaterial, { isLoading: isPutLoading }] = usePutMaterialMutation();

  const formik = useFormik({
    enableReinitialize: isUpdateForm,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isCreateForm) {
        postMaterial(values)
          .unwrap()
          .then(() => {
            successModal.toggle();
          })
          .catch(() => {});
      } else {
        putMaterial({
          ...values,
          _id: materialId,
        })
          .unwrap()
          .then(() => {
            successModal.toggle();
          })
          .catch(() => {});
      }
    },
  });

  const reuseProps = {
    className: 'change-border',
    onChange: formik.handleChange,
    formik: formik,
    required: true,
  };

  const handleBack = () => {
    confirmModal.toggle();
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleConfirm = () => {
    router.push(Path.ADMIN.MATERIAL);
  };

  return (
    <FormContainer>
      <Row className="mb-60" gutter={gutter} wrap>
        <Col span={24}>
          <Input
            type="text"
            label="Material Name"
            name="name"
            value={formik.values.name}
            {...reuseProps}
          />
        </Col>
        <Col span={24}>
          <Input
            type="textarea"
            label="Description"
            name="description"
            value={formik.values.description}
            {...reuseProps}
          />
        </Col>
      </Row>
      <div className="button-group">
        <Space size={10}>
          <Button className="back-btn" type="default" onClick={handleBack}>
            Back
          </Button>
          <Button
            className="submit-btn"
            type="default"
            onClick={handleSubmit}
            loading={isPostLoading || isPutLoading}
          >
            {isCreateForm ? 'Create' : 'Update'}
          </Button>
        </Space>
      </div>
      <CustomModal
        type="confirm"
        title="Confirmation"
        description="Changes will not be saved. Do you want to proceed?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirm}
      />
      <CustomModal
        type="success"
        title={`${isCreateForm ? 'Create' : 'Update'} Material Success`}
        showCloseButton={false}
        visible={successModal.visible}
        onClose={successModal.toggle}
        onConfirm={handleConfirm}
        confirmText="Close"
        showCloseIcon={false}
      />
    </FormContainer>
  );
};

export default MaterialForm;
