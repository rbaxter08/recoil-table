import { selectorFamily } from 'recoil';
import { selectPreparedRows } from './rows';
import { rowSelectionState } from './selectedRows';
import { ReadOnlySelectorFamily } from './data';

export const selectFullRowById: ReadOnlySelectorFamily = selectorFamily<
  any,
  { tableKey: string; rowId: string }
>({
  key: 'recable-select-row-by-id',
  get:
    ({ tableKey, rowId }) =>
    ({ get }) => {
      const row = get(selectPreparedRows<any[]>(tableKey)).find(
        (row) => row.id === rowId,
      );
      const isSelected = get(rowSelectionState(`${tableKey}-${row.id}`));

      if (!row) throw new Error('wtf'); // oops?

      return { ...row, isSelected };
    },
});
