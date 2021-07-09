import { atomFamily } from 'recoil';
import { Column } from './models';

export const columnState = atomFamily<Column[], string>({
  key: 'table-columns',
  default: [],
});
