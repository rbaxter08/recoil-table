import React from 'react';
import {
  columnState,
  selectFullColumnById,
  dataState,
  pageState,
  rowSelector,
  sortState,
} from './selectors';
import { Column } from './selectors/columns';
import { FullColumn } from './selectors/fullColumn';

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
      sortState: sortState(tableKey),
    }),
    [tableKey, options],
  );
}

export type { Column, FullColumn };
