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
