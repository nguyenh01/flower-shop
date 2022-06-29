import { FunctionComponent } from 'react';

interface AdminTitleProps {
  title: string;
  description: string;
}

const AdminTitle: FunctionComponent<AdminTitleProps> = ({ title, description }) => {
  return (
    <div className="admin-title mb-20">
      <div className="title mb-10">{title}</div>
      <div className="description">{description}</div>
    </div>
  );
};

export default AdminTitle;
