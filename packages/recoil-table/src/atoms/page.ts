import { atomFamily } from 'recoil';

export interface Page {
  rowsPerPage: number;
  page: number;
  total: number;
}

export const pageState = atomFamily<Page, string>({
  key: 'recoil-table-page-state',
  default: {
    page: 0,
    rowsPerPage: 10,
    total: 0,
  },
});
