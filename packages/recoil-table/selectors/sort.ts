import { atomFamily } from 'recoil';

interface Sort {
  columnId: string;
  isDesc: boolean;
}

export const sortState = atomFamily<Sort | null, string>({
  key: 'table-sort',
  default: null,
});
