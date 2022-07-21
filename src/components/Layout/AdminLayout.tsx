import Path from '@src/utils/path';
import { FunctionComponent, Key, ReactNode, useEffect, useState } from 'react';
import { MdSpaceDashboard } from 'react-icons/md';
import styled from 'styled-components';
import { Menu, MenuProps, Avatar, message } from 'antd';
import { AiOutlineMenuFold, AiOutlineMenuUnfold } from 'react-icons/ai';
import { FaBoxOpen } from 'react-icons/fa';
import { BiCategory } from 'react-icons/bi';
import { TbTools } from 'react-icons/tb';
import { BsChatTextFill } from 'react-icons/bs';
import { ImUsers, ImProfile } from 'react-icons/im';
import { RiClipboardFill } from 'react-icons/ri';
import { BiLogOut } from 'react-icons/bi';
import useSelector from '@src/utils/useSelector';
import useAuthentication from '@src/hooks/useAuthentication';
import { logout as logOutSlice } from '@src/redux/slices/userSlice';
import dispatch from '@src/utils/dispatch';
import { setCart } from '@src/redux/slices/productSlice';
import { useLogoutMutation } from '@src/api/UserAPI';
import { MenuAdminEnum, RoleEnum } from '@src/utils/constants';
import { FaMoneyCheck } from 'react-icons/fa';
import { useRouter } from 'next/router';

interface AdminLayoutProps {
  children: ReactNode;
  adminTitle?: ReactNode;
}

type MenuItem = Required<MenuProps>['items'][number];

const getItem = (
  label: ReactNode,
  key: Key,
  icon?: ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem => {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
};

const AdminLayout: FunctionComponent<AdminLayoutProps> = ({ children, adminTitle }) => {
  const router = useRouter();

  const [logout] = useLogoutMutation();
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : '';

  const { profile, type } = useSelector((state) => state.userProfile);
  const { selected } = useSelector((state) => state.selectedMenu);
  useAuthentication();

  const isAdmin = type === RoleEnum.ADMIN;

  const adminItems: MenuItem[] = [
    getItem('Dashboard', MenuAdminEnum.DASHBOARD, <MdSpaceDashboard />),
    getItem('Revenue', MenuAdminEnum.REVENUE, <FaMoneyCheck />),
    getItem('Order', MenuAdminEnum.ORDER, <RiClipboardFill />),
    getItem('Category', MenuAdminEnum.CATEGORY, <BiCategory />),
    getItem('Material', MenuAdminEnum.MATERIAL, <TbTools />),
    getItem('Product', MenuAdminEnum.PRODUCT, <FaBoxOpen />),
    getItem('Message', MenuAdminEnum.MESSAGE, <BsChatTextFill />),
    getItem('User List', 'sub1', <ImUsers />, [
      getItem('Customer', MenuAdminEnum.CUSTOMER),
      getItem('Employee', MenuAdminEnum.EMPLOYEE),
    ]),
  ];

  const employeeItems: MenuItem[] = [
    getItem('Order', MenuAdminEnum.ORDER, <RiClipboardFill />),
    getItem('Category', MenuAdminEnum.CATEGORY, <BiCategory />),
    getItem('Material', MenuAdminEnum.MATERIAL, <TbTools />),
    getItem('Product', MenuAdminEnum.PRODUCT, <FaBoxOpen />),
    getItem('Message', MenuAdminEnum.MESSAGE, <BsChatTextFill />),
    getItem('User List', 'sub1', <ImUsers />, [getItem('Customer', MenuAdminEnum.CUSTOMER)]),
    getItem('Profile', MenuAdminEnum.PROFILE, <ImProfile />),
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    if (selected === MenuAdminEnum.CUSTOMER || selected === MenuAdminEnum.EMPLOYEE) {
      setOpenKeys(['sub1']);
    }
  }, [selected]);

  const handleOpenChange = (openKeys: string[]) => {
    setOpenKeys(openKeys);
  };

  const handleClick = ({ key }: any) => {
    switch (key) {
      case MenuAdminEnum.DASHBOARD:
        router.push(Path.ADMIN.DASHBOARD);
        break;
      case MenuAdminEnum.REVENUE:
        router.push(Path.ADMIN.REVENUE);
        break;
      case MenuAdminEnum.ORDER:
        router.push(Path.ADMIN.ORDER);
        break;
      case MenuAdminEnum.CATEGORY:
        router.push(Path.ADMIN.CATEGORY);
        break;
      case MenuAdminEnum.MATERIAL:
        router.push(Path.ADMIN.MATERIAL);
        break;
      case MenuAdminEnum.PRODUCT:
        router.push(Path.ADMIN.PRODUCT);
        break;
      case MenuAdminEnum.MESSAGE:
        router.push(Path.ADMIN.MESSAGE);
        break;
      case MenuAdminEnum.CUSTOMER:
        router.push(Path.ADMIN.CUSTOMER);
        break;
      case MenuAdminEnum.EMPLOYEE:
        router.push(Path.ADMIN.EMPLOYEE);
        break;
      case MenuAdminEnum.PROFILE:
        router.push(Path.ADMIN.PROFILE);
        break;
    }
  };

  const handleLogout = () => {
    logout({ refreshToken })
      .unwrap()
      .then(() => {});
    dispatch(setCart([]));
    dispatch(logOutSlice());
    message.success('Logout Success');
  };

  return (
    <Container>
      <Menu
        openKeys={openKeys}
        selectedKeys={[selected]}
        mode="inline"
        theme="dark"
        inlineCollapsed={collapsed}
        items={isAdmin ? adminItems : employeeItems}
        onClick={handleClick}
        onOpenChange={handleOpenChange}
      />
      <div className="content">
        <div className="navbar mb-20">
          <div className="toggle" onClick={toggleCollapsed}>
            {collapsed ? <AiOutlineMenuUnfold /> : <AiOutlineMenuFold />}
          </div>
          <div className="user">
            <Avatar
              style={{ backgroundColor: '#0D6EFD', verticalAlign: 'middle', marginRight: '10px' }}
              size={40}
              gap={4}
            >
              {profile.firstName?.slice(0, 1)}
            </Avatar>
            Hello, <span className="name">{profile.firstName} !</span>
            <BiLogOut className="logout-icon" onClick={handleLogout} />
          </div>
        </div>
        {adminTitle}
        <div className="children">{children}</div>
      </div>
    </Container>
  );
};

const Container = styled.div`
  display: flex;

  .ant-menu {
    padding: 15px;
  }

  .ant-menu-inline {
    width: 320px;
    min-width: 320px;
  }

  .ant-menu-sub {
    width: 100%;
    padding: 0px !important;
  }

  .ant-menu-dark.ant-menu-inline .ant-menu-item {
    width: 90%;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: ${(props) => props.theme.colors.blue};
  }

  .ant-menu-dark .ant-menu-inline.ant-menu-sub {
    background: transparent;
  }

  .ant-menu-submenu-arrow {
    right: 0;
  }

  .ant-menu-item-icon {
    width: 20px;
    height: 20px;
  }

  .ant-menu-dark.ant-menu-dark:not(.ant-menu-horizontal) .ant-menu-item-selected {
    border-radius: 8px;
  }

  .ant-menu.ant-menu-inline-collapsed > .ant-menu-item {
    padding: 5px calc(50% - 20px / 2);
  }

  .content {
    width: 100%;
    height: 140vh;
    padding: 16px;
    background-color: #f2f4f6;

    .navbar {
      ${(props) => props.theme.displayFlex('space-between', 'center')}
      background-color: #fff;
      padding: 10px 20px;
      border-radius: 10px;

      .toggle {
        cursor: pointer;
        padding: 10px;
        display: grid;
        place-items: center;

        svg {
          width: 25px;
          height: 25px;
        }

        &:hover {
          background: #d1d5db;
          border-radius: 8px;
        }
      }

      .user {
        ${(props) => props.theme.displayFlex('center', 'center')}

        .name {
          font-weight: 600;
          margin-left: 5px;
        }

        .logout-icon {
          width: 23px;
          height: 23px;
          fill: #000;
          margin-left: 5px;
          cursor: pointer;
          transition: all 0.3s ease-in-out;

          &:hover {
            fill: ${(props) => props.theme.colors.blue};
          }
        }
      }
    }

    .admin-title {
      padding: 0px 15px;
    }

    .title {
      ${(props) => props.theme.fontCustom(24, 500, 24)};
      text-transform: uppercase;
    }

    .description {
      font-size: 16px;
    }

    .children {
      width: 100%;
      height: auto;
      background-color: #fff;
      padding: 30px;
      border-radius: 10px;
    }
  }
`;

export default AdminLayout;
