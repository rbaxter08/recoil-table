import React from 'react';
import {
  columnState,
  dataState,
  pageState,
  rowSelector,
  sortState,
} from './selectors';

export interface Options {
  controlledPagination?: boolean;
}

export function useTable(tableKey: string, options: Options = {}) {
  return React.useMemo(
    () => ({
      columnAtom: columnState(tableKey),
      dataAtom: dataState(tableKey),
      pageAtom: pageState(tableKey),
      selectRows: rowSelector({ tableKey, options }),
      sortState: sortState(tableKey),
    }),
    [tableKey, options],
  );
}
