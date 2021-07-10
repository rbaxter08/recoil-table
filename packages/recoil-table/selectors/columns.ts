import { atomFamily } from 'recoil';

export interface Column {
  Header: string;
  accessor: string;
}

export const columnState = atomFamily<Column[], string>({
  key: 'table-columns',
  default: [],
});
