import { selectorFamily } from 'recoil';
import { ReadOnlySelectorFamily } from '../helpers';
import { dataState } from '../atoms/data';
import { pageState } from '../atoms/page';
import { configState } from '../atoms/tableConfig';
import { selectSort } from './sort';

export const selectPreparedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recable-select-prepared-rows',
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

export const selectSortedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recable-select-sorted-rows',
  get:
    (tableKey) =>
    ({ get }) => {
      const sortColumn = get(selectSort(tableKey));
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

export const selectPaginatedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recable-select-paginated-rows',
  get:
    (tableKey) =>
    ({ get }) => {
      const page = get(pageState(tableKey));
      const rows = get(selectSortedRows<any[]>(tableKey));
      const isManual = get(configState(tableKey)).manualControl;
      if (isManual) return rows;

      const start = page.rowsPerPage * page.page;
      const end = start + page.rowsPerPage;
      const pageRows = rows.slice(start, end);
      return pageRows;
    },
});

export const selectRows: ReadOnlySelectorFamily = selectorFamily<any, string>({
  key: 'recable-select-rows',
  get:
    (tableKey) =>
    ({ get }) => ({
      rows: get(selectPaginatedRows(tableKey)),
      total: get(dataState<any[]>(tableKey)).length,
    }),
});
