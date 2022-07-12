import { Fragment, FunctionComponent } from 'react';
import { CheckCircleOutlined, CloseCircleOutlined, SyncOutlined } from '@ant-design/icons';
import { Tag as AntdTag } from 'antd';
import { COLOR_STATUS, OrderStatusEnum } from '@src/utils/constants';

interface TagProps {
  status: number;
}

const Tag: FunctionComponent<TagProps> = ({ status }) => {
  const renderTag = () => {
    switch (status) {
      case OrderStatusEnum.Waiting:
        return (
          <AntdTag icon={<SyncOutlined spin />} color={COLOR_STATUS[status]}>
            Waiting
          </AntdTag>
        );
      case OrderStatusEnum.Confirm:
        return (
          <AntdTag icon={<SyncOutlined />} color={COLOR_STATUS[status]}>
            Confirmed
          </AntdTag>
        );
      case OrderStatusEnum.Received:
        return (
          <AntdTag icon={<CheckCircleOutlined />} color={COLOR_STATUS[status]}>
            Received
          </AntdTag>
        );
      case OrderStatusEnum.Cancelled:
        return (
          <AntdTag icon={<CloseCircleOutlined />} color={COLOR_STATUS[status]}>
            Cancelled
          </AntdTag>
        );
    }
  };
  return <Fragment>{renderTag()}</Fragment>;
};

export default Tag;
