import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useSetRecoilState } from 'recoil';
import { useTable, Options, FullColumn } from 'recoil-table';

interface Props {
  tableKey: string;
  options: Options;
  column: FullColumn;
}

export const RecoilHeaderSortControl: React.FC<Props> = ({
  tableKey,
  options,
  column,
  children,
}) => {
  const { sortState } = useTable(tableKey, options);
  const setSort = useSetRecoilState(sortState);
  return (
    <TableSortLabel
      active={column.isSorted}
      direction={column.isDesc ? 'desc' : 'asc'}
      onClick={() =>
        setSort((prev) => ({
          columnId: column.accessor,
          isDesc: !prev?.isDesc,
        }))
      }
    >
      {children}
    </TableSortLabel>
  );
};
