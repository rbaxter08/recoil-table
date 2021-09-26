import { RecoilState, RecoilValueReadOnly, selectorFamily } from 'recoil';
import { ReadOnlySelectorFamily } from '../helpers';
import { dataAtom } from './core';
import { pageState } from './page';
import { tableOptionsState } from './tableOptions';
import { selectSort } from './sort';

export type Row<T> = {
  item: T;
  id: string;
};

const _selectPreparedRows = selectorFamily<Row<any>[], string>({
  key: 'recoil-table-select-prepared-rows',
  get: (tableKey) => ({ get }) => {
    const { items } = get(dataAtom(tableKey));
    return items.map((item, index: number) => ({
      item,
      id: `${index}`,
    }));
  },
});

function selectPreparedRows<T>(key: string): RecoilValueReadOnly<Row<T>[]> {
  return _selectPreparedRows(key);
}

export const selectSortedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recoil-table-select-sorted-rows',
  get: (tableKey) => ({ get }) => {
    const sortColumn = get(selectSort(tableKey));
    const rows = get(selectPreparedRows(tableKey));
    if (!sortColumn || get(tableOptionsState(tableKey)).manualControl)
      return rows;
    return [...rows].sort((a, b) => {
      if (sortColumn.isDesc) {
        // @ts-ignore
        return b[sortColumn.columnId] - a[sortColumn.columnId];
      } else {
        // @ts-ignore
        return a[sortColumn.columnId] - b[sortColumn.columnId];
      }
    });
  },
});

export const selectPaginatedRows: ReadOnlySelectorFamily = selectorFamily<
  any,
  string
>({
  key: 'recoil-table-select-paginated-rows',
  get: (tableKey) => ({ get }) => {
    const page = get(pageState(tableKey));
    const rows = get(selectSortedRows<any[]>(tableKey));
    const isManual = get(tableOptionsState(tableKey)).manualControl;
    if (isManual) return rows;

    const start = page.rowsPerPage * page.page;
    const end = start + page.rowsPerPage;
    const pageRows = rows.slice(start, end);
    return pageRows;
  },
});

const _selectRows = selectorFamily<any, string>({
  key: 'recoil-table-select-rows',
  get: (tableKey) => ({ get }) => ({
    rows: get(selectPaginatedRows(tableKey)),
    total: get(dataAtom<any[]>(tableKey)).total,
  }),
});

export function rowsAtom<T>(
  key: string,
): RecoilValueReadOnly<{ rows: Row<T>[]; total: number }> {
  return _selectRows(key);
}
