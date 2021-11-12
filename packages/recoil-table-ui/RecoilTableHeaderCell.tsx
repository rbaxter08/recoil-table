import TableCell from '@mui/material/TableCell';
import { Column, TableInstance } from 'recoil-table';
import { RecoilHeaderSortControl } from './RecoilHeaderSortControl';

interface Props<T> {
  tableInstance: TableInstance<T>;
  column: Column<T>;
}

function RecoilTableHeader<T>({ tableInstance, column }: Props<T>) {
  return (
    <TableCell style={{ minWidth: 150 }}>
      {column.sortable ? (
        <RecoilHeaderSortControl column={column} tableInstance={tableInstance}>
          {column.Header}
        </RecoilHeaderSortControl>
      ) : (
        column.Header
      )}
    </TableCell>
  );
}

export default RecoilTableHeader;
