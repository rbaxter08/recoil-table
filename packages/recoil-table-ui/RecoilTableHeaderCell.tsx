import React from 'react';
import { useRecoilValue } from 'recoil';
import TableCell from '@material-ui/core/TableCell';
import { useTable, Options, Column } from 'recoil-table';
import { RecoilHeaderSortControl } from './RecoilHeaderSortControl';

function RecoilTableHeader({
  tableKey,
  options,
  column,
}: {
  tableKey: string;
  options: Options;
  column: Column;
}) {
  const { selectFullColumnById } = useTable(tableKey, options);
  const fullColumn = useRecoilValue(
    selectFullColumnById(column?.accessor || column.id),
  );
  console.log(fullColumn);
  return (
    <TableCell style={{ minWidth: 150 }}>
      {fullColumn.sortable ? (
        <RecoilHeaderSortControl
          column={fullColumn}
          tableKey={tableKey}
          options={options}
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
