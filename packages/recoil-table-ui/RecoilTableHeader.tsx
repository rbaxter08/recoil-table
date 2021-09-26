import { useRecoilValue } from 'recoil';
import { TableInstance } from 'recoil-table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
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
