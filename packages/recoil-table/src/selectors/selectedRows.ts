import { selectorFamily } from 'recoil';
import { selectedRowsState, rowSelectionState } from '../atoms/rowSelection';
import { SelectorFamily } from '../helpers';

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
