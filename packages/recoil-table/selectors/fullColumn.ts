import { selectorFamily } from 'recoil';
import { columnState, Column, columnSortState } from './columns';

export interface FullColumn extends Column {
  isSorted: boolean;
  isDesc: boolean;
}

export const selectFullColumnById = selectorFamily<FullColumn, any>({
  key: 'recable-select-column-by-id',
  get:
    ({ tableKey, columnId }) =>
    ({ get }) => {
      const column = get(columnState(tableKey)).find(
        (col) => col.accessor === columnId || col.id === columnId,
      );

      if (!column) throw new Error('wtf'); // oops?

      if (column.sortable) {
        const { isSorted, isDesc } = get(
          columnSortState(`${tableKey}-${column.accessor || column.id}`),
        );

        return { ...column, isSorted, isDesc };
      }

      return { ...column, isSorted: false, isDesc: false };
    },
});
