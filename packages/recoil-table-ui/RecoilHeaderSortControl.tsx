import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
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
  const columnSortState = useRecoilValue(
    // @ts-ignore
    tableInstance.columnSortState(column.accessor || column.id),
  );
  const setSort = useSetRecoilState(tableInstance.selectSort);
  return (
    <TableSortLabel
      active={columnSortState.isSorted}
      direction={columnSortState.isDesc ? 'desc' : 'asc'}
      onClick={() =>
        setSort(() => ({
          columnId: column.accessor || column.id || '',
          isDesc: !columnSortState.isDesc,
        }))
      }
    >
      {children}
    </TableSortLabel>
  );
}
