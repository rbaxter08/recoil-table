import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Column, TableInstance } from 'recoil-table';

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
  const columnSortState = useRecoilValue(
    tableInstance.columnSortState(column.id),
  );
  const setSort = useSetRecoilState(tableInstance.selectSort);
  return (
    <TableSortLabel
      active={columnSortState.isSorted}
      direction={columnSortState.isDesc ? 'desc' : 'asc'}
      onClick={() =>
        setSort(() => ({
          columnId: column.id,
          isDesc: !columnSortState.isDesc,
        }))
      }
    >
      {children}
    </TableSortLabel>
  );
}
