import React from 'react';
import { atomFamily } from 'recoil';

export interface Column {
  Header: string;
  id?: string;
  accessor?: string;
  sortable?: boolean;
  renderCell?: (row: any) => React.ReactNode;
}

export const columnState = atomFamily<Column[], string>({
  key: 'table-columns',
  default: [],
});

interface ColumnSortState {
  isSorted: boolean;
  isDesc: boolean;
}

export const columnSortState = atomFamily<ColumnSortState, string>({
  key: 'table-column-sort-state',
  default: {
    isSorted: false,
    isDesc: false,
  },
});
