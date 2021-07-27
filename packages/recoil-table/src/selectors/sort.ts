import { selectorFamily } from 'recoil';
import { sortedColumnIdState, Sort } from '../atoms/sort';
import { columnSortState } from '../atoms/columns';
import { guardRecoilDefaultValue } from '../helpers';

export const selectSort = selectorFamily<Sort, string>({
  key: 'recoil-table-select-sort',
  get:
    (tableKey) =>
    ({ get }) => {
      const columnId = get(sortedColumnIdState(tableKey));
      if (columnId) {
        const colSortState = get(columnSortState(`${tableKey}-${columnId}`));
        return { columnId, isDesc: colSortState.isDesc };
      }
      return { columnId: '', isDesc: false };
    },
  set:
    (tableKey) =>
    ({ get, set }, newValue) => {
      // if default value, reset global and column specific
      if (guardRecoilDefaultValue(newValue)) {
        const columnId = get(sortedColumnIdState(tableKey));
        set(columnSortState(`${tableKey}-${columnId}`), {
          isSorted: false,
          isDesc: false,
        });
        set(sortedColumnIdState(tableKey), newValue);
        return;
      }
      const columnId = get(sortedColumnIdState(tableKey));
      set(columnSortState(`${tableKey}-${columnId}`), {
        isSorted: false,
        isDesc: false,
      });
      set(sortedColumnIdState(tableKey), newValue.columnId);
      set(columnSortState(`${tableKey}-${newValue.columnId}`), (prev) => ({
        isSorted: true,
        isDesc: !prev.isDesc,
      }));
    },
});
