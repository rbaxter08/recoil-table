import { selectorFamily } from 'recoil';
import { dataState } from './data';
import { pageState } from './page';

export const selectedPaginatedData = selectorFamily<any, string>({
  key: 'select-table-page-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const page = get(pageState(tableKey));
      const rows = get(dataState(tableKey));
      const start = page.rowsPerPage * page.page;
      const end = start + page.rowsPerPage - 1;
      const pageRows = rows.slice(start, end);
      return pageRows;
    },
});

export const rowSelector = selectorFamily<any, string>({
  key: 'select-table-rows',
  get:
    (tableKey) =>
    ({ get }) =>
      get(selectedPaginatedData(tableKey)),
});
