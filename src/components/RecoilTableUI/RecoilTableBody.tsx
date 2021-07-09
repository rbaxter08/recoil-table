import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTable } from '../../recoil-table';

interface Props {
  tableKey: string;
}

export function RecoilTableBody({ tableKey }: Props) {
  const { columns, rows } = useTable(tableKey);
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
