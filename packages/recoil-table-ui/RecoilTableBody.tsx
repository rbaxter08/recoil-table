import { useRecoilValue } from 'recoil';
import TableBody from '@material-ui/core/TableBody';
import { useTable, Options } from 'recoil-table';
import { RecoilTableRow } from './RecoilTableRow';

interface Props {
  tableKey: string;
  options: Options;
  rowSelection?: boolean;
}

export function RecoilTableBody({ tableKey, options, rowSelection }: Props) {
  const { selectRows } = useTable(tableKey, options);
  const { rows } = useRecoilValue(selectRows);

  return (
    <TableBody>
      {rows.map((row: any) => (
        <RecoilTableRow
          row={row}
          tableKey={tableKey}
          options={options}
          rowSelection={rowSelection}
        />
      ))}
    </TableBody>
  );
}
