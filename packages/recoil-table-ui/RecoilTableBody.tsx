import { useRecoilValue } from 'recoil';
import TableBody from '@mui/material/TableBody';
import { TableInstance } from 'recoil-table';
import { RecoilTableRow } from './RecoilTableRow';

interface Props<T> {
  tableInstance: TableInstance<T>;
  rowSelection?: boolean;
}

export function RecoilTableBody<T>({ tableInstance, rowSelection }: Props<T>) {
  const { rows } = useRecoilValue(tableInstance.selectRows);
  return (
    <TableBody>
      {rows.map((row) => (
        <RecoilTableRow
          row={row}
          tableInstance={tableInstance}
          rowSelection={rowSelection}
        />
      ))}
    </TableBody>
  );
}
