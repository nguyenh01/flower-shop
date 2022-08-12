import { LanguageEnum } from '@src/utils/constants';
import { Drawer } from 'antd';
import Cookies from 'js-cookie';
import { FunctionComponent, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseSharp } from 'react-icons/io5';

interface MenuDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const MenuDrawer: FunctionComponent<MenuDrawerProps> = ({ visible, onClose }) => {
  const { i18n, t } = useTranslation();
  const [active, setActive] = useState(LanguageEnum.ENGLISH);

  const handleChangeLanguage = (language: number) => {
    i18n.changeLanguage(language === LanguageEnum.ENGLISH ? 'english' : 'vietnamese');
    if (language === LanguageEnum.ENGLISH) {
      Cookies.set('language', `${LanguageEnum.ENGLISH}`);
      setActive(LanguageEnum.ENGLISH);
    } else {
      Cookies.set('language', `${LanguageEnum.VIETNAMESE}`);
      setActive(LanguageEnum.VIETNAMESE);
    }
  };

  useEffect(() => {
    const languageCookie = Cookies.get('language');
    const formatLanguageCookieToNumber = Number(languageCookie);
    handleChangeLanguage && handleChangeLanguage(formatLanguageCookieToNumber);
  }, []);

  return (
    <Drawer
      visible={visible}
      onClose={onClose}
      className="language-drawer"
      placement="right"
      closeIcon={<IoCloseSharp className="close-icon" />}
    >
      <div className="title">{t('menu.aboutUs')}</div>
      <div className="desc-content">{t('menu.description')}</div>
      <div className="switcher">
        <div className="switcher-title">{t('menu.language')}:</div>
        <div className="language-container">
          <div
            className={`${
              active === LanguageEnum.ENGLISH ? 'language-button active-btn' : 'language-button'
            }`}
            onClick={() => handleChangeLanguage(LanguageEnum.ENGLISH)}
          >
            english
          </div>
          <div
            className={`${
              active === LanguageEnum.VIETNAMESE ? 'language-button active-btn' : 'language-button'
            }`}
            onClick={() => handleChangeLanguage(LanguageEnum.VIETNAMESE)}
          >
            vietnamese
          </div>
        </div>
      </div>
    </Drawer>
  );
};

export default MenuDrawer;
