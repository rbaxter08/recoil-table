import React from 'react';
import {
  columnState,
  selectFullColumnById,
  dataState,
  pageState,
  rowSelector,
  selectedRows,
  sortState,
} from './selectors';
import { Column } from './selectors/columns';
import { FullColumn } from './selectors/fullColumn';
import { selectFullRowById } from './selectors/fullRow';

export interface Options {
  controlledPagination?: boolean;
}

export function useTable(tableKey: string, options: Options = {}) {
  return React.useMemo(
    () => ({
      columnAtom: columnState(tableKey),
      selectFullColumnById: (columnId: string) =>
        selectFullColumnById({ tableKey, columnId }),
      dataAtom: dataState(tableKey),
      pageAtom: pageState(tableKey),
      selectRows: rowSelector({ tableKey, options }),
      selectedRowsAtom: selectedRows(tableKey),
      selectFullRowById: (rowId: string) =>
        selectFullRowById({ tableKey, rowId }),
      sortState: sortState(tableKey),
    }),
    [tableKey, options],
  );
}

export type { Column, FullColumn };
