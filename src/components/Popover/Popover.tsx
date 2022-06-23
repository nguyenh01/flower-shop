import { FunctionComponent, ReactNode } from 'react';
import { PopoverProps as PopoverAntdProps } from 'antd';
import { Popover as PopoverAntd } from 'antd';

interface PopoverProps extends PopoverAntdProps {
  content: ReactNode;
  children: ReactNode;
  overlayClassName?: string;
}

const Popover: FunctionComponent<PopoverProps> = ({ content, children, ...props }) => {
  return (
    <PopoverAntd placement="bottom" content={content} trigger="hover" {...props}>
      {children}
    </PopoverAntd>
  );
};

export default Popover;
