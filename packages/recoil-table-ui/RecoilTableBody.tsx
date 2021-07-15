import React from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import TableBody from '@material-ui/core/TableBody';
import { useTable, Options } from 'recoil-table';
import { RecoilTableRow } from './RecoilTableRow';
import { RowSelectionColumn } from './RowSelectionColumn';

interface Props {
  tableKey: string;
  options: Options;
  rowSelection?: boolean;
}

export function RecoilTableBody({ tableKey, options, rowSelection }: Props) {
  const { selectRows, columnAtom } = useTable(tableKey, options);
  const { rows } = useRecoilValue(selectRows);
  const setColumns = useSetRecoilState(columnAtom);

  React.useEffect(() => {
    if (rowSelection) {
      console.log('pushing rowSelection');
      setColumns((prev) => [RowSelectionColumn, ...prev]);
    }
  }, [rowSelection]);

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
