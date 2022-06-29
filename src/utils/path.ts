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
  ADMIN: '/admin',
  ADMIN_REVENUE: '/admin/revenue',
  ADMIN_ORDER: '/admin/order',
  ADMIN_CATEGORY: '/admin/category',
  ADMIN_MATERIAL: '/admin/material',
  ADMIN_PRODUCT: '/admin/product',
  UPDATE_ADMIN_PRODUCT: (id: string) => `/admin/product/update/${id}`,
  ADMIN_MESSAGE: '/admin/message',
  ADMIN_CUSTOMER: '/admin/customer',
  ADMIN_EMPLOYEE: '/admin/employee',
};

export default Path;
