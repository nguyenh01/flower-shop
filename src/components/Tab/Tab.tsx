import { FunctionComponent, ReactNode } from 'react';
import { Tabs } from 'antd';
import styled from 'styled-components';

interface TabProps {
  tabPane: {
    tab: string;
    key: number | string;
    content: ReactNode;
  }[];
}

const Tab: FunctionComponent<TabProps> = ({ tabPane }) => {
  return (
    <StyledTab tabPosition="left">
      {tabPane.map((item) => (
        <StyledTabpane key={item.key} tab={item.tab}>
          {item.content}
        </StyledTabpane>
      ))}
    </StyledTab>
  );
};

const StyledTab = styled(Tabs)`
  .ant-tabs-nav {
    background-color: #000;
    height: fit-content;
  }

  .ant-tabs-tab {
    color: #fff;
    padding: 20px 50px !important;
    margin-top: 0px !important;

    &:hover {
      background-color: ${(props) => props.theme.colors.primary};
      color: #fff;
    }
  }

  .ant-tabs-tab-active {
    background-color: ${(props) => props.theme.colors.primary};
    color: #fff;
  }

  .ant-tabs-tab-btn:active {
    color: #fff;
  }

  .ant-tabs-tab-btn {
    text-transform: uppercase;
    font-weight: 500;
  }

  .ant-tabs-tab.ant-tabs-tab-active .ant-tabs-tab-btn {
    color: #fff;
  }

  .ant-tabs-content-holder {
    margin-left: 20px;
    border-left: unset;
    padding: 15px 0;
    background-color: #f3f3f3;
    border-radius: 5px;
  }

  .ant-tabs-ink-bar {
    background-color: transparent;
  }
`;

const StyledTabpane = styled(Tabs.TabPane)`
  padding-right: 24px;
`;

export default Tab;
