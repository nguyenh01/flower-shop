import { Space } from 'antd';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FiEdit, FiDelete } from 'react-icons/fi';
import useSelector from '@src/utils/useSelector';
import { RoleEnum } from '@src/utils/constants';

interface ActionGroupProps {
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const ActionGroup: FunctionComponent<ActionGroupProps> = ({ handleUpdate, handleDelete }) => {
  const { type } = useSelector((state) => state.userProfile);
  const isAdmin = type === RoleEnum.ADMIN;

  const handleUpdateAction = () => {
    handleUpdate && handleUpdate();
  };

  const handleDeleteAction = () => {
    handleDelete && handleDelete();
  };

  return (
    <ActionContainer>
      <Space size={15}>
        <FiEdit className="update-icon" onClick={handleUpdateAction} />
        {isAdmin && <FiDelete className="delete-icon" onClick={handleDeleteAction} />}
      </Space>
    </ActionContainer>
  );
};

const ActionContainer = styled.div`
  svg {
    width: 22px;
    height: 22px;
    cursor: pointer;
  }

  .delete-icon {
    stroke: ${(props) => props.theme.colors.red};
  }
`;

export default ActionGroup;
