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
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import { usePostCategoryMutation, usePutCategoryMutation } from '@src/api/CategoryAPI';

interface CategoryFormProps {
  type: 'create' | 'update';
  initialValue: InitialValueCategoryAndMaterialFormik;
  categoryId?: string;
}

const CategoryForm: FunctionComponent<CategoryFormProps> = ({ type, initialValue, categoryId }) => {
  const isCreateForm = type === 'create';
  const isUpdateForm = type === 'update';
  const router = useRouter();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [20, 20], []);

  const [postCategory, { isLoading: isPostLoading }] = usePostCategoryMutation();
  const [putCategory, { isLoading: isPutLoading }] = usePutCategoryMutation();

  const formik = useFormik({
    enableReinitialize: isUpdateForm,
    initialValues: initialValue,
    //validationSchema: validationSchema,
    onSubmit: (values) => {
      if (isCreateForm) {
        postCategory(values)
          .unwrap()
          .then(() => {
            successModal.toggle();
          })
          .catch(() => {});
      } else {
        putCategory({
          ...values,
          _id: categoryId,
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
    router.push(Path.ADMIN.CATEGORY);
  };

  return (
    <FormContainer>
      <Row className="mb-60" gutter={gutter} wrap>
        <Col span={24}>
          <Input
            type="text"
            label="Category Name"
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
      <ModalConfirm
        type="confirm"
        title="Confirmation"
        description="Changes will not be saved. Do you want to proceed?"
        closeText="Cancel"
        confirmText="Confirm"
        visible={confirmModal.visible}
        onClose={confirmModal.toggle}
        onConfirm={handleConfirm}
      />
      <ModalConfirm
        type="success"
        title={`${isCreateForm ? 'Create' : 'Update'} Category Success`}
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

export default CategoryForm;
