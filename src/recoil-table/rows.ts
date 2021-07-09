import { selectorFamily } from 'recoil';
import { selectedPaginatedData } from './page';
import { dataState } from './data';
import { Page } from './models';

interface Props {
  tableKey: string;
  page?: Page;
  manualPagination?: boolean;
  [key: string]: any;
}

export const selectRows = selectorFamily<any, Props>({
  key: 'select-table-rows',
  get:
    ({ tableKey, page, manualPagination }) =>
    ({ get }) => {
      return !page || manualPagination
        ? get(dataState(tableKey))
        : get(selectedPaginatedData({ tableKey, page }));
    },
  set:
    ({ tableKey }) =>
    ({ set }, newValue) =>
      set(dataState(tableKey), newValue),
});
