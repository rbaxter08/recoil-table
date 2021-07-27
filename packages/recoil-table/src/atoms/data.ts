import { atomFamily } from 'recoil';
import { AtomFamily } from '../helpers';

export const dataState: AtomFamily = atomFamily<any, string>({
  key: 'recoil-table-data-state',
  default: [],
});
