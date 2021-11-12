import { useRecoilValue } from 'recoil';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import { Row, TableInstance } from 'recoil-table';

interface Props<T> {
  row: Row<T>;
  tableInstance: TableInstance<T>;
  rowSelection?: boolean;
}

export function RecoilTableRow<T>({ tableInstance, row }: Props<T>) {
  const columns = useRecoilValue(tableInstance.columnAtom);
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell>
          {/** @ts-ignore  */}
          {column.accessor ? row.item[column.accessor] : column.renderCell(row)}
        </TableCell>
      ))}
    </TableRow>
  );
}
