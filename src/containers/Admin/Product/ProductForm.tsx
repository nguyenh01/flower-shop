import Input from '@src/components/Input/Input';
import Select from '@src/components/Select/Select';
import Col from 'antd/lib/grid/col';
import Row, { Gutter } from 'antd/lib/grid/row';
import { useFormik } from 'formik';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import { InitialValueFormik } from './data-model';
import { Space, Upload } from 'antd';
import { RcFile, UploadFile, UploadProps } from 'antd/lib/upload/interface';
import Typography from '@src/components/Typography/Typography';
import Button from '@src/components/Button/Button';
import { useGetCategoriesQuery } from '@src/api/CategoryAPI';
import { useGetMaterialsQuery } from '@src/api/MaterialAPI';
import { usePostProductMutation, usePutProductMutation } from '@src/api/ProductAPI';
import ModalConfirm from '@src/components/ModalConfirm/ModalConfirm';
import useBooleanState from '@src/hooks/useBooleanState';
import { useRouter } from 'next/router';
import Path from '@src/utils/path';
import { validationSchema } from './constant';
import { imgPath } from '@src/utils/constants';
import { v4 as uuid } from 'uuid';
import convertImageUrlToFile from '@src/utils/imageUrlToFile';

interface ProductFormAdministrationProps {
  type: 'create' | 'update';
  initialValue: InitialValueFormik;
}

const ProductFormAdministration: FunctionComponent<ProductFormAdministrationProps> = ({
  type,
  initialValue,
}) => {
  const { Label } = Typography;
  const isCreateForm = type === 'create';
  const isUpdateForm = type === 'update';
  const router = useRouter();

  const confirmModal = useBooleanState();
  const successModal = useBooleanState();

  const gutter: [Gutter, Gutter] = useMemo(() => [20, 20], []);

  const { data: categories } = useGetCategoriesQuery({ is_paging: false });
  const { data: materials } = useGetMaterialsQuery({ is_paging: false });

  const [fileList, setFileList] = useState<UploadFile[]>([]);

  const [postProduct, { isLoading: isPostLoading }] = usePostProductMutation();
  const [putProduct, { isLoading: isPutLoading }] = usePutProductMutation();

  useEffect(() => {
    if (isUpdateForm) {
      const formatFileList = (initialValue?.images ?? []).map((item) => {
        const filePromise = convertImageUrlToFile(`${imgPath}${item}`).then((response) => response);
        const url = `${imgPath}${item}`;

        return {
          uid: uuid().slice(0, 5),
          name: item.split('/').pop() as string,
          url: url,
          originFileObj: filePromise,
        };
      });
      setFileList(formatFileList as any);
    }
  }, [initialValue]);

  console.log(fileList);

  const formik = useFormik({
    enableReinitialize: isUpdateForm,
    initialValues: initialValue,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      const imageList = fileList.map((item) => item.originFileObj);
      for (const key in values) {
        formData.append(key, values[key as keyof InitialValueFormik] as any);
      }
      imageList.forEach((file) => {
        formData.append('images', file as Blob);
      });

      if (isCreateForm) {
        postProduct(formData)
          .unwrap()
          .then(() => {
            successModal.toggle();
          })
          .catch(() => {});
      } else {
        putProduct(formData)
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

  const onChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file: UploadFile) => {
    let src = file.url as string;
    if (!src) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj as RcFile);
        reader.onload = () => resolve(reader.result as string);
      });
    }
    const image = new Image();
    image.src = src;
    const imgWindow = window.open(src);
    imgWindow?.document.write(image.outerHTML);
  };

  const handleBack = () => {
    confirmModal.toggle();
  };

  const handleSubmit = () => {
    formik.handleSubmit();
  };

  const handleConfirm = () => {
    router.push(Path.ADMIN.PRODUCT);
  };

  return (
    <FormContainer>
      <Row className="mb-60" gutter={gutter} wrap>
        <Col span={8}>
          <Input
            type="text"
            label="Product Name"
            name="name"
            value={formik.values.name}
            {...reuseProps}
          />
        </Col>
        <Col span={8}>
          <Input
            type="number"
            label="Price"
            name="price"
            value={formik.values.price}
            {...reuseProps}
          />
        </Col>
        <Col span={8}>
          <Input
            type="number"
            label="Stock"
            name="unitsinstock"
            value={formik.values.unitsinstock}
            {...reuseProps}
          />
        </Col>
        <Col span={12}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Select Category"
            label="Category"
            name="cate_id"
            value={formik.values.cate_id}
            options={categories?.data?.result.map((item) => ({
              key: item._id,
              value: item._id,
              render: () => item.name,
            }))}
            {...reuseProps}
          />
        </Col>
        <Col span={12}>
          <Select
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
            }
            placeholder="Select Material"
            label="Material"
            name="mate_id"
            value={formik.values.mate_id}
            options={materials?.data?.result.map((item) => ({
              key: item._id,
              value: item._id,
              render: () => item.name,
            }))}
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
        <Col span={24}>
          <Label>
            <span>Upload</span>
            <span className="required-mark">&nbsp;*</span>
          </Label>
          <Upload
            name="image"
            listType="picture-card"
            fileList={fileList}
            onChange={onChange}
            onPreview={onPreview}
            accept=".png, .jpg, .jpeg"
            maxCount={3}
            multiple
          >
            {fileList.length < 3 && '+ Upload'}
          </Upload>
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
        title={`${isCreateForm ? 'Create' : 'Update'} Product Success`}
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

export const FormContainer = styled.div`
  .button-group {
    display: grid;
    place-items: center;

    .back-btn {
      background-color: #001529;
    }

    .submit-btn {
      background-color: ${(props) => props.theme.colors.blue};
    }
  }

  .ant-upload.ant-upload-select-picture-card:hover {
    border-color: ${(props) => props.theme.colors.blue};
  }

  .change-border {
    &:hover {
      border-color: ${(props) => props.theme.colors.blue} !important;
    }

    &:focus {
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue} !important;
      border-color: ${(props) => props.theme.colors.blue} !important;
    }
  }

  .ant-select-focused:not(.ant-select-disabled).ant-select:not(.ant-select-customize-input)
    .ant-select-selector {
    box-shadow: 0 0 0 1px ${(props) => props.theme.colors.blue};
    border-color: ${(props) => props.theme.colors.blue} !important;
  }
`;

export default ProductFormAdministration;
