import { useRecoilValue } from 'recoil';
import { columnState } from './recoil';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

interface Props {
  tableKey: string;
  data: any[];
}

export function RecoilTableBody({ tableKey, data }: Props) {
  const columns = useRecoilValue(columnState(tableKey));
  return (
    <TableBody>
      {data.map((row) => (
        <TableRow>
          {columns.map((column) => (
            <TableCell>{row[column.accessor]}</TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}
