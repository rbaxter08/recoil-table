import { useRecoilValue } from 'recoil';
import TableBody from '@material-ui/core/TableBody';
import { TableInstance } from 'recoil-table';
import { RecoilTableRow } from './RecoilTableRow';

interface Props {
  tableInstance: TableInstance;
  rowSelection?: boolean;
}

export function RecoilTableBody({ tableInstance, rowSelection }: Props) {
  const { rows } = useRecoilValue(tableInstance.selectRows);
  return (
    <TableBody>
      {rows.map((row: any) => (
        <RecoilTableRow
          row={row}
          tableInstance={tableInstance}
          rowSelection={rowSelection}
        />
      ))}
    </TableBody>
  );
}
