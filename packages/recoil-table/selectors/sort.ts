import { atomFamily, selectorFamily, DefaultValue } from 'recoil';
import { columnSortState } from './columns';

export const guardRecoilDefaultValue = (
  candidate: any,
): candidate is DefaultValue => {
  if (candidate instanceof DefaultValue) return true;
  return false;
};

// stores column name of atom that is sorted
export const sortedColumnIdState = atomFamily<string, string>({
  key: 'sorted-column-id-state',
  default: '',
});

interface Sort {
  columnId: string;
  isDesc: boolean;
}

export const sortState = selectorFamily<Sort, string>({
  key: 'table-sort',
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
