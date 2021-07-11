import { selectorFamily } from 'recoil';
import { dataState } from './data';
import { pageState } from './page';
import { sortState } from './sort';

export const selectSortedData = selectorFamily<any, string>({
  key: 'select-table-sort-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const sortColumn = get(sortState(tableKey));
      const rows = get(dataState(tableKey));
      if (!sortColumn) return rows;
      return [...rows].sort((a, b) => {
        if (sortColumn.isDesc) {
          return b[sortColumn.columnId] - a[sortColumn.columnId];
        } else {
          return a[sortColumn.columnId] - b[sortColumn.columnId];
        }
      });
    },
});

export const selectedPaginatedData = selectorFamily<any, string>({
  key: 'select-table-page-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const page = get(pageState(tableKey));
      const rows = get(selectSortedData(tableKey));
      const start = page.rowsPerPage * page.page;
      const end = start + page.rowsPerPage - 1;
      const pageRows = rows.slice(start, end);
      return pageRows;
    },
});

export const rowSelector = selectorFamily<any, any>({
  key: 'select-table-rows',
  get:
    ({ tableKey, options }) =>
    ({ get }) => {
      return options.controlledPagination
        ? {
            rows: get(selectSortedData(tableKey)),
            total: get(dataState(tableKey)).total,
          }
        : {
            rows: get(selectedPaginatedData(tableKey)),
            total: get(dataState(tableKey)).length,
          };
    },
});
