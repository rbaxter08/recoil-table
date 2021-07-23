import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useRecoilState } from 'recoil';
import { TableInstance, Column } from 'recoil-table';

interface Props<T> {
  tableInstance: TableInstance<T>;
  column: Column<T>;
  children: React.ReactNode | undefined;
}

export function RecoilHeaderSortControl<T>({
  tableInstance,
  column,
  children,
}: Props<T>) {
  const [sortState, setSort] = useRecoilState(
    // @ts-ignore
    tableInstance.columnSortState(column.id),
  );
  return (
    <TableSortLabel
      active={sortState.isSorted}
      direction={sortState.isDesc ? 'desc' : 'asc'}
      onClick={() =>
        setSort((prev) => ({
          ...prev,
          isDesc: !prev.isDesc,
        }))
      }
    >
      {children}
    </TableSortLabel>
  );
}
