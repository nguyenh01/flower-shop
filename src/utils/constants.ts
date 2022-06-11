export const imgPath = process.env.NODE_ENV === 'production' || 'http://localhost:3000/';

export enum RoleEnum {
  BUYER,
  MEMBERSHIP,
  EMPLOYEE,
  ADMIN,
}

export const allRole = [RoleEnum.BUYER, RoleEnum.MEMBERSHIP, RoleEnum.EMPLOYEE, RoleEnum.ADMIN];

export const DEFAULT_FORMAT_DATE = 'MM/DD/YYYY';
