import React from 'react';
import { RecoilState, RecoilValueReadOnly } from 'recoil';
import {
  columnState,
  columnSortState,
  dataState,
  pageState,
  rowSelector,
  selectedRows,
  sortState,
  rowSelectionState,
} from './selectors';
import { Page } from './selectors/page';
import { Sort, ColumnSortState } from './selectors/sort';
import { Column } from './selectors/columns';

export interface Options {
  controlledPagination?: boolean;
}

export interface TableInstance<T> {
  columnAtom: RecoilState<Column<T>[]>;
  columnSortState: (columnId: string) => RecoilState<ColumnSortState>;
  dataAtom: RecoilState<T[]>;
  pageAtom: RecoilState<Page>;
  selectRows: RecoilValueReadOnly<T[]>;
  selectedRowsAtom: RecoilState<T[]>;
  rowSelectionState: (rowId: string) => RecoilState<boolean>;
  sortState: RecoilState<Sort>;
}

export function useTable<T>(
  tableKey: string,
  options: Options = {},
): TableInstance<T> {
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
    }),
    [tableKey, options],
  );
}

export type { Column };
