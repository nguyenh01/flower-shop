export enum RoleEnum {
  BUYER = 0,
  MEMBERSHIP = 1,
  EMPLOYEE = 2,
  ADMIN = 3,
}

export const allRole = [RoleEnum.BUYER, RoleEnum.MEMBERSHIP, RoleEnum.EMPLOYEE, RoleEnum.ADMIN];

export enum MenuAdminEnum {
  DASHBOARD = '1',
  REVENUE = '2',
  ORDER = '3',
  CATEGORY = '4',
  MATERIAL = '5',
  PRODUCT = '6',
  MESSAGE = '7',
  CUSTOMER = '8',
  EMPLOYEE = '9',
  PROFILE = '10',
}

export enum OrderStatusEnum {
  Waiting,
  Confirm,
  Received,
  Cancelled,
}

export const COLOR_STATUS = ['#3f51b5', '#2196f3', '#4caf50', '#f44336'];

export const DEFAULT_FORMAT_DATE = 'MM/DD/YYYY';

export const requiredValidation = (field: string) => `${field} is required`;
export const integerValidation = (field: string) => `${field} must be an integer`;
export const positiveValidation = (field: string) => `${field} must be a positive number`;

export const truncateString = (string: string, maxCharacter = 80) => {
  if (string.length > maxCharacter) return string.slice(0, maxCharacter) + '...';
  return string;
};
