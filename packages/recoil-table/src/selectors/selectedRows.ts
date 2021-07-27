import { selectorFamily } from 'recoil';
import { selectedRowsState, rowSelectionState } from '../atoms/rowSelection';

export const selectSelectedRows = selectorFamily<
  Record<string, boolean>,
  string
>({
  key: 'recoil-table-select-selected-rows',
  get:
    (tableKey) =>
    ({ get }) =>
      get(selectedRowsState(tableKey)),
  set:
    (tableKey) =>
    ({ get, set }, newValue) => {
      const prevSelectedRows = get(selectedRowsState(tableKey));
      const updatedRows = Object.keys(newValue).filter((key) => {
        // todo rbaxter - check for default value
        // @ts-ignore
        return prevSelectedRows[key] !== newValue[key];
      });
      updatedRows.forEach((rowId) => {
        // todo rbaxter - check for default value
        // @ts-ignore
        set(rowSelectionState(`${tableKey}-${rowId}`), newValue[rowId]);
      });
      set(selectedRowsState(tableKey), newValue);
    },
});
