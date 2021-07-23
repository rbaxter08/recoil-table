import React from 'react';
import { useRecoilValue } from 'recoil';
import TableCell from '@material-ui/core/TableCell';
import { TableInstance, Column } from 'recoil-table';
import { RecoilHeaderSortControl } from './RecoilHeaderSortControl';

interface Props<T> {
  tableInstance: TableInstance<T>;
  column: Column<T>;
}

function RecoilTableHeader<T>({ tableInstance, column }: Props<T>) {
  const fullColumn = useRecoilValue(
    // @ts-ignore
    tableInstance.selectFullColumnById(column?.accessor || column.id),
  );
  return (
    <TableCell style={{ minWidth: 150 }}>
      {/**@ts-ignore */}
      {fullColumn.sortable ? (
        <RecoilHeaderSortControl
          column={fullColumn}
          tableInstance={tableInstance}
        >
          {column.Header}
        </RecoilHeaderSortControl>
      ) : (
        column.Header
      )}
    </TableCell>
  );
}

export default RecoilTableHeader;
