import { FunctionComponent, ReactNode } from 'react';
import { PopoverProps as PopoverAntdProps } from 'antd';
import { Popover as PopoverAntd } from 'antd';

interface PopoverProps extends PopoverAntdProps {
  content: ReactNode;
  children: ReactNode;
}

const Popover: FunctionComponent<PopoverProps> = ({ content, children }) => {
  return (
    <PopoverAntd overlayClassName="popover" placement="bottom" content={content} trigger="hover">
      {children}
    </PopoverAntd>
  );
};

export default Popover;
