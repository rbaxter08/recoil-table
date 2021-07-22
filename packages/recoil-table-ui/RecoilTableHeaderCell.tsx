import React from 'react';
import { useRecoilValue } from 'recoil';
import TableCell from '@material-ui/core/TableCell';
import { TableInstance, Column } from 'recoil-table';
import { RecoilHeaderSortControl } from './RecoilHeaderSortControl';

function RecoilTableHeader({
  tableInstance,
  column,
}: {
  tableInstance: TableInstance;
  column: Column;
}) {
  const fullColumn = useRecoilValue(
    // @ts-ignore
    tableInstance.selectFullColumnById(column?.accessor || column.id),
  );
  return (
    <TableCell style={{ minWidth: 150 }}>
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
