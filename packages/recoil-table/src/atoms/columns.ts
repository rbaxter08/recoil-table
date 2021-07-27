import React from 'react';
import { atomFamily } from 'recoil';
import { AtomFamily } from '../helpers';

export interface Column<T> {
  Header: string;
  id?: string;
  accessor?: string;
  sortable?: boolean;
  renderCell?: (row: T) => React.ReactNode;
}

export const columnState: AtomFamily = atomFamily<any, string>({
  key: 'table-columns',
  default: [],
});

export interface ColumnSortState {
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
