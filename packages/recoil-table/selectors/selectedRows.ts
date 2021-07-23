import { atomFamily, selectorFamily, DefaultValue } from 'recoil';
import { SelectorFamily } from './data';

export const guardRecoilDefaultValue = (
  candidate: any,
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

export const rowSelectionState = atomFamily<boolean, string>({
  key: 'table-row-selection-state',
  default: false,
});

export const selectedRowsState = atomFamily<any, string>({
  key: 'table-selected-rows',
  default: [],
});

export const selectedRows: SelectorFamily = selectorFamily<any, string>({
  key: 'table-sort',
  get:
    (tableKey) =>
    ({ get }) =>
      get(selectedRowsState(tableKey)),
  set:
    (tableKey) =>
    ({ get, set }, newValue) => {
      const prevSelectedRows = get(selectedRowsState(tableKey));
      const updatedRows = Object.keys(newValue).filter((key) => {
        return prevSelectedRows[key] !== newValue[key];
      });
      updatedRows.forEach((rowId) => {
        set(rowSelectionState(`${tableKey}-${rowId}`), newValue[rowId]);
      });
      set(selectedRowsState(tableKey), newValue);
    },
});
