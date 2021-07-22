import React from 'react';
import { useRecoilValue } from 'recoil';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TableInstance } from 'recoil-table';
import RecoilTableHeaderCell from './RecoilTableHeaderCell';

function RecoilTableHeader({
  tableInstance,
}: {
  tableInstance: TableInstance;
}) {
  const columns = useRecoilValue(tableInstance.columnAtom);
  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <RecoilTableHeaderCell
            column={column}
            tableInstance={tableInstance}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default React.memo(RecoilTableHeader);
