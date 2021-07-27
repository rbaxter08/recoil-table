import { atomFamily } from 'recoil';

export const rowSelectionState = atomFamily<boolean, string>({
  key: 'table-row-selection-state',
  default: false,
});

export const selectedRowsState = atomFamily<any, string>({
  key: 'table-selected-rows',
  default: [],
});
