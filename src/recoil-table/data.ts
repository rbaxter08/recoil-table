import { atomFamily, selectorFamily } from 'recoil';
import { Page } from './models';

export const dataState = atomFamily<any[], string>({
  key: 'table-data',
  default: [],
});

interface Props {
  tableKey: string;
  page?: Page;
  [key: string]: any;
}

export const selectTotalDataLength = selectorFamily<number, Props>({
  key: 'select-table-data-length',
  get:
    ({ tableKey }) =>
    ({ get }) =>
      get(dataState(tableKey)).length,
});
