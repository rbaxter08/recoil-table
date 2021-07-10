import { atomFamily } from 'recoil';

export const dataState = atomFamily<any, string>({
  key: 'table-data',
  default: {
    data: [],
    total: 0,
  },
});
