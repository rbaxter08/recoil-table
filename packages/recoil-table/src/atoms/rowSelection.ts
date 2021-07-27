import { atomFamily } from 'recoil';

export const rowSelectionState = atomFamily<boolean, string>({
  key: 'recable-row-selection-state',
  default: false,
});

export const selectedRowsState = atomFamily<Record<string, boolean>, string>({
  key: 'recable-selected-rows-state',
  default: {},
});
