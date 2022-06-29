import { Space } from 'antd';
import { FunctionComponent } from 'react';
import styled from 'styled-components';
import { FiEdit, FiDelete } from 'react-icons/fi';

interface ActionGroupProps {
  handleUpdate?: () => void;
  handleDelete?: () => void;
}

const ActionGroup: FunctionComponent<ActionGroupProps> = ({ handleUpdate, handleDelete }) => {
  const handleUpdateAction = () => {
    handleUpdate && handleUpdate();
  };

  const handleDeleteAction = () => {
    handleDelete && handleDelete();
  };

  return (
    <Container>
      <Space size={15}>
        <FiEdit className="update-icon" onClick={handleUpdateAction} />
        <FiDelete className="delete-icon" onClick={handleDeleteAction} />
      </Space>
    </Container>
  );
};

const Container = styled.div`
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
