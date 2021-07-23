import React from 'react';
import { atomFamily } from 'recoil';
import { AtomFamily } from './data';

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
