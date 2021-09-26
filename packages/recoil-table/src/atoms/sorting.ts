import { atomFamily } from 'recoil';

export interface ColumnSortState {
  isSorted: boolean;
  isDesc: boolean;
}

export const columnSortState = atomFamily<ColumnSortState, string>({
  key: 'recoil-table-column-sort-state',
  default: {
    isSorted: false,
    isDesc: false,
  },
});

export interface Sort {
  columnId: string;
  isDesc: boolean;
}

/**
 *  Stores the id of the actively sorted column.
 **/
export const sortedColumnIdState = atomFamily<string, string>({
  key: 'recoil-table-sorted-column-id-state',
  default: '',
});
