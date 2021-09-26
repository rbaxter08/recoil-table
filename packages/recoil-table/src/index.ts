import {
  columnAtom,
  columnSortState,
  dataAtom,
  rowSelectionState,
  tableOptionsState,
  TableOptions,
  pageState,
  rowsAtom,
  selectSelectedRows,
  selectSort,
} from './atoms';

export function createTableInstance<T>(
  tableKey: string,
  options: TableOptions = {},
) {
  return {
    columnAtom: columnAtom<T>(tableKey),
    columnSortState: (columnId: string) =>
      columnSortState(`${tableKey}-${columnId}`),
    dataAtom: dataAtom<T>(tableKey),
    pageAtom: pageState(tableKey),
    selectRows: rowsAtom<T>(tableKey),
    selectSelectedRows: selectSelectedRows(tableKey),
    rowSelectionState: (rowId: string) =>
      rowSelectionState(`${tableKey}-${rowId}`),
    selectSort: selectSort(tableKey),
    tableOptionsState: tableOptionsState(tableKey),
  };
}

// Typescript magic, pls ignore
class Wrapper<T> {
  wrapped = (tableKey: string, options: TableOptions = {}) =>
    createTableInstance<T>(tableKey, options);
}
export type TableInstance<T> = ReturnType<Wrapper<T>['wrapped']>;
