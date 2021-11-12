import { useRecoilValue } from 'recoil';
import { TableInstance } from 'recoil-table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import RecoilTableHeaderCell from './RecoilTableHeaderCell';

interface Props<T> {
  tableInstance: TableInstance<T>;
}

export function RecoilTableHeader<T>({ tableInstance }: Props<T>) {
  const columns = useRecoilValue(tableInstance.columnAtom);

  return (
    <TableHead>
      <TableRow>
        {columns.map((column) => (
          <RecoilTableHeaderCell
            column={column}
            tableInstance={tableInstance}
          />
        ))}
      </TableRow>
    </TableHead>
  );
}
