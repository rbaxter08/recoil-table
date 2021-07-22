import { useRecoilValue } from 'recoil';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableInstance } from 'recoil-table';

interface Props {
  row: any;
  tableInstance: TableInstance;
  rowSelection?: boolean;
}

export function RecoilTableRow({ tableInstance, row }: Props) {
  const columns = useRecoilValue(tableInstance.columnAtom);
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
