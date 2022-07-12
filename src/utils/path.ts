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
    ORDER_DETAIL: (id: string) => `/admin/order/detail/${id}`,
    CATEGORY: '/admin/category',
    CREATE_CATEGORY: '/admin/category/create',
    UPDATE_CATEGORY: (id: string) => `/admin/category/update/${id}`,
    MATERIAL: '/admin/material',
    CREATE_MATERIAL: '/admin/material/create',
    UPDATE_MATERIAL: (id: string) => `/admin/material/update/${id}`,
    PRODUCT: '/admin/product',
    CREATE_PRODUCT: '/admin/product/create',
    UPDATE_PRODUCT: (id: string) => `/admin/product/update/${id}`,
    MESSAGE: '/admin/message',
    CUSTOMER: '/admin/customer',
    EMPLOYEE: '/admin/employee',
  },
};

export default Path;
