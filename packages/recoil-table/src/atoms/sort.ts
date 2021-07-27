import { atomFamily } from 'recoil';

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
