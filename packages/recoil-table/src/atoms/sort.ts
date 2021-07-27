import { atomFamily } from 'recoil';

export interface Sort {
  columnId: string;
  isDesc: boolean;
}

// stores column name of atom that is sorted
export const sortedColumnIdState = atomFamily<string, string>({
  key: 'sorted-column-id-state',
  default: '',
});
