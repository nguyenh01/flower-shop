import { FunctionComponent, useEffect, useState } from 'react';
import Logo from '@src/components/Logo/Logo';
import Container from './style';
import { Badge, Col, message, Row } from 'antd';
import Path from '@src/utils/path';
import { useRouter } from 'next/router';
import { IoCartOutline, IoSearch } from 'react-icons/io5';
import { BiUser } from 'react-icons/bi';
import { MdOutlineMenu } from 'react-icons/md';
import useBooleanState from '@src/hooks/useBooleanState';
import MenuDrawer from './Drawer';
import { TFunction, useTranslation } from 'react-i18next';
import Popover from '@src/components/Popover/Popover';
import { useLogoutMutation } from '@src/api/AuthenticationAPI';
import dispatch from '@src/utils/dispatch';
import { logout as logOutSlice } from '@src/redux/slices/userSlice';
import useSelector from '@src/utils/useSelector';
import { setCart } from '@src/redux/slices/productSlice';
import Cookies from 'js-cookie';

const Header: FunctionComponent = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const drawer = useBooleanState();
  const { isAuth, profile } = useSelector((state) => state.userProfile);
  const { cartItems, count } = useSelector((state) => state.productSlice);

  const headerValue = [
    { name: t('menu.home'), link: Path.HOME },
    { name: t('menu.shop'), link: Path.SHOP },
    { name: t('menu.aboutUs'), link: Path.ABOUT_US },
    { name: t('menu.contact'), link: Path.CONTACT },
  ];

  const [totalCartItem, setTotalCartItem] = useState<number>();

  useEffect(() => {
    if (isAuth) {
      setTotalCartItem(cartItems.length);
    } else {
      const cartCookie = Cookies.get('carts');
      if (cartCookie) {
        const parseJson = JSON.parse(cartCookie);
        setTotalCartItem(parseJson.length);
      }
    }
  }, [cartItems, isAuth, count]);

  const handleGoToPage = (link: string) => {
    router.push(link);
  };

  return (
    <Container>
      <Row gutter={[30, 0]} align="middle">
        <Col lg={6} xl={6} md={12}>
          <Logo />
        </Col>
        <Col lg={12}>
          <nav className="nav">
            {headerValue.map((item) => (
              <div key={item.name} className="item" onClick={() => handleGoToPage(item.link)}>
                {item.name}
              </div>
            ))}
          </nav>
        </Col>
        <Col lg={6} md={12}>
          <div className="header-right">
            <div className="cart-wrap" onClick={() => handleGoToPage(Path.CART)}>
              <Badge count={totalCartItem} showZero overflowCount={10} offset={[2, 0]}>
                <IoCartOutline className="cart-icon" />
              </Badge>
            </div>
            <div className="search-wrap">
              <IoSearch className="search-icon" />
            </div>
            <div className="user-wrap">
              <div className="popover-wrapper">
                <Popover
                  content={
                    isAuth ? <PopoverContentWithAuthentication t={t} /> : <PopoverContent t={t} />
                  }
                >
                  <div className="wrapper">
                    <BiUser className="user-icon" />
                  </div>
                  {isAuth && (
                    <span className="user-name">{`Hi, ${profile.firstName} ${profile.lastName} !`}</span>
                  )}
                </Popover>
              </div>
            </div>
            <div className="language-wrap">
              <MdOutlineMenu className="language-icon" onClick={drawer.toggle} />
            </div>
          </div>
        </Col>
      </Row>
      <MenuDrawer visible={drawer.visible} onClose={drawer.toggle} />
    </Container>
  );
};

interface PopoverContentProps {
  t: TFunction;
}

const PopoverContent = ({ t }: PopoverContentProps) => {
  const router = useRouter();

  const handleGoToLoginPage = () => {
    router.push(Path.LOGIN);
  };

  const handleGoToRegisterPage = () => {
    router.push(Path.REGISTER);
  };

  return (
    <div className="popover-content-user">
      <div className="popover-user-item" onClick={handleGoToLoginPage}>
        {t('menu.login')}
      </div>
      <div className="popover-user-item" onClick={handleGoToRegisterPage}>
        {t('menu.register')}
      </div>
    </div>
  );
};

const PopoverContentWithAuthentication = ({ t }: PopoverContentProps) => {
  const router = useRouter();
  const [logout] = useLogoutMutation();

  const handleGoToAccountPage = () => {
    router.push(Path.MY_ACCOUNT);
  };

  const handleLogout = () => {
    logout(null)
      .unwrap()
      .then(() => {});
    dispatch(setCart([]));
    dispatch(logOutSlice());
    message.success('Logout Success');
  };

  return (
    <div className="popover-content-user">
      <div className="popover-user-item" onClick={handleGoToAccountPage}>
        {t('menu.myAccount')}
      </div>
      <div className="popover-user-item" onClick={handleLogout}>
        {t('menu.logout')}
      </div>
    </div>
  );
};

export default Header;
