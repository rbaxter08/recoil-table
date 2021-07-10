import { useRecoilValue } from 'recoil';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTable } from 'recoil-table';

interface Props {
  tableKey: string;
}

export function RecoilTableBody({ tableKey }: Props) {
  const { columnAtom, selectRows } = useTable(tableKey);
  const columns = useRecoilValue(columnAtom);
  const rows = useRecoilValue(selectRows);
  return (
    <TableBody>
      {rows.map((row: any) => (
        <TableRow>
          {columns.map((column) => (
            <TableCell>{row[column.accessor]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
