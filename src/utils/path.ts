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
  ADMIN: {
    DASHBOARD: '/admin',
    REVENUE: '/admin/revenue',
    ORDER: '/admin/order',
    MATERIAL: '/admin/material',
    PRODUCT: '/admin/product',
    CREATE_PRODUCT: '/admin/product/create',
    UPDATE_PRODUCT: (id: string) => `/admin/product/update/${id}`,
    MESSAGE: '/admin/message',
    CUSTOMER: '/admin/customer',
    EMPLOYEE: '/admin/employee',
  },
};

export default Path;
