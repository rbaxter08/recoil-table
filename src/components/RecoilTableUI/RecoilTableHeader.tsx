import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTable } from '../../recoil-table';

function RecoilTableHeader({ tableKey }: { tableKey: string }) {
  const { columns } = useTable(tableKey);
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
