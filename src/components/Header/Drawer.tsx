import { Drawer } from 'antd';
import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoCloseSharp } from 'react-icons/io5';

enum LanguageEnum {
  ENGLISH = 0,
  VIETNAMESE = 1,
}

interface MenuDrawerProps {
  visible: boolean;
  onClose: () => void;
}

const MenuDrawer: FunctionComponent<MenuDrawerProps> = ({ visible, onClose }) => {
  const { i18n, t } = useTranslation();
  const [active, setActive] = useState(0);

  const handleChangeLanguage = (language: number) => {
    i18n.changeLanguage(language === 0 ? 'english' : 'vietnamese');
    language === 0 ? setActive(0) : setActive(1);
  };

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
            className={`${active === 0 ? 'language-button active-btn' : 'language-button'}`}
            onClick={() => handleChangeLanguage(LanguageEnum.ENGLISH)}
          >
            english
          </div>
          <div
            className={`${active === 1 ? 'language-button active-btn' : 'language-button'}`}
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
