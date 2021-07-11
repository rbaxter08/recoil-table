import React from 'react';
import { useRecoilValue } from 'recoil';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useTable, Options } from 'recoil-table';
import RecoilTableHeaderCell from './RecoilTableHeaderCell';

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
          <RecoilTableHeaderCell
            column={column}
            tableKey={tableKey}
            options={options}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}

export default React.memo(RecoilTableHeader);
