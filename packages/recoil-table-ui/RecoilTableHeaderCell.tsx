import React from 'react';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import { useRecoilValue, useSetRecoilState } from 'recoil';
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
    selectFullColumnById({
      tableKey,
      columnId: column.accessor,
    }),
  );
  return (
    <TableCell>
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
