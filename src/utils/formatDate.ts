import { DEFAULT_FORMAT_DATE } from '@src/utils/constants';
import moment from 'moment';

export const formatDate = (date: string | undefined) => {
  if (!date) {
    return 'N/A';
  }
  return moment(date).format(DEFAULT_FORMAT_DATE);
};
