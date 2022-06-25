const Path = {
  HOME: '/',
  SHOP: '/shop',
  ABOUT_US: '/about-us',
  CONTACT: '/contact',
  LOGIN: '/login',
  REGISTER: '/register',
  MY_ACCOUNT: '/my-account',
  PAGE_NOT_FOUND: '/page-not-found',
  PRODUCT_DETAIL: (id: string) => `/product/${id}`,
  CART: '/cart',
  CHECK_OUT: '/checkout',
  ADMIN: '/admin'
};

export default Path;
