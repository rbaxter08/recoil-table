import { atomFamily, selectorFamily } from 'recoil';
import { Page } from './models';
import { dataState } from './data';

export const pageState = atomFamily<Page, string>({
  key: 'table-page',
  default: {
    page: 0,
    rowsPerPage: 10,
  },
});

interface Props {
  tableKey: string;
  [key: string]: string;
}

interface PageProps {
  tableKey: string;
  page: Page;
  [key: string]: any;
}

export const selectedPaginatedData = selectorFamily<any, PageProps>({
  key: 'select-table-page-data',
  get:
    ({ tableKey, page }) =>
    ({ get }) => {
      const rows = get(dataState(tableKey));
      const start = page.rowsPerPage * page.page;
      const end = start + page.rowsPerPage - 1;
      const pageRows = rows.slice(start, end);
      console.log('rows for page', pageRows);
      return pageRows;
    },
});

export const selectPage = selectorFamily<Page, Props>({
  key: 'select-table-page',
  get:
    ({ tableKey }) =>
    ({ get }) =>
      get(pageState(tableKey)),
  set:
    ({ tableKey }) =>
    ({ set }, newValue) =>
      set(pageState(tableKey), newValue),
});
