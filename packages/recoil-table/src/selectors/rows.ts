import { selectorFamily } from 'recoil';
import { ReadOnlySelectorFamily } from '../helpers';
import { dataState } from '../atoms/data';
import { pageState } from '../atoms/page';
import { configState } from '../atoms/tableConfig';
import { sortState } from './sort';

export const selectPreparedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'select-table-full-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const rows = get(dataState<any[]>(tableKey));
      return rows.map((row, index: number) => ({
        ...row,
        id: index,
      }));
    },
});

export const selectSortedData: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'select-table-sort-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const sortColumn = get(sortState(tableKey));
      const rows = get(selectPreparedRows<any[]>(tableKey));
      if (!sortColumn || get(configState(tableKey)).manualControl) return rows;
      return [...rows].sort((a, b) => {
        if (sortColumn.isDesc) {
          return b[sortColumn.columnId] - a[sortColumn.columnId];
        } else {
          return a[sortColumn.columnId] - b[sortColumn.columnId];
        }
      });
    },
});

export const selectedPaginatedData: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'select-table-page-data',
  get:
    (tableKey) =>
    ({ get }) => {
      const page = get(pageState(tableKey));
      const rows = get(selectSortedData<any[]>(tableKey));
      const isManual = get(configState(tableKey)).manualControl;
      if (isManual) return rows;

      const start = page.rowsPerPage * page.page;
      const end = start + page.rowsPerPage;
      const pageRows = rows.slice(start, end);
      return pageRows;
    },
});

export const rowSelector: ReadOnlySelectorFamily = selectorFamily<any, string>({
  key: 'select-table-rows',
  get:
    (tableKey) =>
    ({ get }) => ({
      rows: get(selectedPaginatedData(tableKey)),
      total: get(dataState<any[]>(tableKey)).length,
    }),
});
