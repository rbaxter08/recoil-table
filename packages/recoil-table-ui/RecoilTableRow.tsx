import { useRecoilValue } from 'recoil';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { useTable, Options } from 'recoil-table';

interface Props {
  row: any;
  tableKey: string;
  options: Options;
  rowSelection?: boolean;
}

export function RecoilTableRow({ tableKey, options, row }: Props) {
  const { columnAtom } = useTable(tableKey, options);
  const columns = useRecoilValue(columnAtom);
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell>
          {column.accessor
            ? row[column.accessor]
            : column.renderCell
            ? column.renderCell(row)
            : ''}
        </TableCell>
      ))}
    </TableRow>
  );
}
