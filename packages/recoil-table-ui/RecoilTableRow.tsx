import { useRecoilValue } from 'recoil';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import { TableInstance } from 'recoil-table';

interface Props<T> {
  row: any;
  tableInstance: TableInstance<T>;
  rowSelection?: boolean;
}

export function RecoilTableRow<T>({ tableInstance, row }: Props<T>) {
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
