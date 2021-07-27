import React from 'react';
import { RecoilState, RecoilValueReadOnly, useSetRecoilState } from 'recoil';
import {
  columnState,
  columnSortState,
  dataState,
  rowSelectionState,
  ColumnSortState,
  Page,
  Sort,
  Column,
  configState,
  TableOptions,
} from './src/atoms';
import {
  pageState,
  rowSelector,
  selectedRows,
  sortState,
} from './src/selectors';

export interface TableInstance<T> {
  columnAtom: RecoilState<Column<T>[]>;
  columnSortState: (columnId: string) => RecoilState<ColumnSortState>;
  dataAtom: RecoilState<T[]>;
  pageAtom: RecoilState<Page>;
  selectRows: RecoilValueReadOnly<T[]>;
  selectedRowsAtom: RecoilState<T[]>;
  rowSelectionState: (rowId: string) => RecoilState<boolean>;
  sortState: RecoilState<Sort>;
  configState: RecoilState<TableOptions>;
}

export function useTable<T>(
  tableKey: string,
  options: TableOptions = {},
): TableInstance<T> {
  const setConfig = useSetRecoilState(configState(tableKey));
  React.useEffect(() => {
    setConfig(options);
  }, []);

  return React.useMemo(
    () => ({
      columnAtom: columnState(tableKey),
      columnSortState: (columnId: string) =>
        columnSortState(`${tableKey}-${columnId}`),
      dataAtom: dataState(tableKey),
      pageAtom: pageState(tableKey),
      selectRows: rowSelector(tableKey),
      selectedRowsAtom: selectedRows(tableKey),
      rowSelectionState: (rowId: string) =>
        rowSelectionState(`${tableKey}-${rowId}`),
      sortState: sortState(tableKey),
      configState: configState(tableKey),
    }),
    [tableKey, options],
  );
}

export type { Column };
