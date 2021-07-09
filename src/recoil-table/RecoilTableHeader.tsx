import React from 'react';
import { useRecoilValue } from 'recoil';
import { columnState } from './recoil';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

function RecoilTableHeader({ tableKey }: { tableKey: string }) {
  const columns = useRecoilValue(columnState(tableKey));
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
