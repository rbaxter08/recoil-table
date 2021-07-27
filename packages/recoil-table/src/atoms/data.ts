import { atomFamily } from 'recoil';
import { AtomFamily } from '../helpers';

export const dataState: AtomFamily = atomFamily<any, string>({
  key: 'recable-data-state',
  default: [],
});
