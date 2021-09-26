import { ReactNode } from 'react';
import { atomFamily, RecoilState } from 'recoil';
import { AtomFamily } from '../helpers';

/***** Data *****/

const _dataAtom: AtomFamily = atomFamily<any, string>({
  key: 'recoil-table-data-state',
  default: {
    items: [],
    total: 0,
  },
});

export function dataAtom<T>(
  key: string,
): RecoilState<{
  items: T[];
  total: number;
}> {
  return _dataAtom(key);
}

/***** Columns *****/

interface ColumnBase {
  Header: string;
  id: string;
  sortable?: boolean;
}

interface ColumnWithAccessor<T> extends ColumnBase {
  accessor: keyof T;
  renderCell?: (row: T) => ReactNode;
}

interface ColumnWithoutAccessor<T> extends ColumnBase {
  accessor?: never;
  renderCell: (row: T) => ReactNode;
}

export type Column<T> = ColumnWithoutAccessor<T> | ColumnWithAccessor<T>;

const _columnAtom: AtomFamily = atomFamily<any, string>({
  key: 'recoil-table-column-state',
  default: [],
});

export function columnAtom<T>(key: string): RecoilState<Column<T>[]> {
  return _columnAtom(key);
}
