import { selectorFamily } from 'recoil';
import { selectPreparedRows } from './rows';
import { rowSelectionState } from './selectedRows';

export const selectFullRowById = selectorFamily<any, any>({
  key: 'recable-select-row-by-id',
  get:
    ({ tableKey, rowId }) =>
    ({ get }) => {
      const row = get(selectPreparedRows(tableKey)).find(
        (row) => row.id === rowId,
      );
      const isSelected = get(rowSelectionState(`${tableKey}-${row.id}`));

      if (!row) throw new Error('wtf'); // oops?

      return { ...row, isSelected };
    },
});
