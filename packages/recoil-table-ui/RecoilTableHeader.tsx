import React from 'react';
import { useRecoilValue } from 'recoil';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTable, Options } from 'recoil-table';

function RecoilTableHeader({
  tableKey,
  options,
}: {
  tableKey: string;
  options: Options;
}) {
  const { columnAtom } = useTable(tableKey, options);
  const columns = useRecoilValue(columnAtom);
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <TableCell>{column.Header}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default React.memo(RecoilTableHeader);
