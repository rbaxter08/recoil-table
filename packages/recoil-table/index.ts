import React from 'react';
import { columnState, dataState, pageState, rowSelector } from './selectors';

export function useTable(tableKey: string) {
  return React.useMemo(
    () => ({
      columnAtom: columnState(tableKey),
      dataAtom: dataState(tableKey),
      pageAtom: pageState(tableKey),
      selectRows: rowSelector(tableKey),
    }),
    [tableKey],
  );
}
