import { atomFamily } from 'recoil';

export const rowSelectionState = atomFamily<boolean, string>({
  key: 'recoil-table-row-selection-state',
  default: false,
});

export const selectedRowsState = atomFamily<Record<string, boolean>, string>({
  key: 'recoil-table-selected-rows-state',
  default: {},
});
