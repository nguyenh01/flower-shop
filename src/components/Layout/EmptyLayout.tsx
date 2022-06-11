import { Fragment, FunctionComponent, ReactNode } from 'react';

interface EmptyLayoutProps {
  children: ReactNode;
}

const EmptyLayout: FunctionComponent<EmptyLayoutProps> = ({ children }) => {
  return <Fragment>{children}</Fragment>;
};

export default EmptyLayout;
