import { atomFamily } from 'recoil';

export interface Column {
  Header: string;
  accessor: string;
  sortable?: boolean;
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
