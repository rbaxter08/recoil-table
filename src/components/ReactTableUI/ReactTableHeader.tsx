import React from 'react';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Props {
  headerGroups: any;
}

function RecoilTableHeader({ headerGroups }: Props) {
  return (
    <TableHead>
      {headerGroups.map((headerGroup: any) => (
        <TableRow {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map((column: any) => (
            <TableCell {...column.getHeaderProps()}>
              {column.render('Header')}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableHead>
  );
}

export default React.memo(RecoilTableHeader);
