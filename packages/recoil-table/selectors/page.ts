import { atomFamily } from 'recoil';

export interface Page {
  rowsPerPage: number;
  page: number;
  total: number;
}

export const pageState = atomFamily<Page, string>({
  key: 'table-page',
  default: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
});
