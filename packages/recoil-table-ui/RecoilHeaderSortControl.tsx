import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useSetRecoilState } from 'recoil';
import { TableInstance, FullColumn } from 'recoil-table';

interface Props {
  tableInstance: TableInstance;
  column: FullColumn;
}

export const RecoilHeaderSortControl: React.FC<Props> = ({
  tableInstance,
  column,
  children,
}) => {
  const setSort = useSetRecoilState(tableInstance.sortState);
  return (
    <TableSortLabel
      active={column.isSorted}
      direction={column.isDesc ? 'desc' : 'asc'}
      onClick={() =>
        // @ts-ignore
        setSort(() => ({
          columnId: column.accessor || column.id,
          isDesc: !column.isDesc,
        }))
      }
    >
      {children}
    </TableSortLabel>
  );
};
