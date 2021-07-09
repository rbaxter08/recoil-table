import React from 'react';
import { useSetRecoilState } from 'recoil';
import { columnState } from './recoil';
import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import RecoilTableHeader from './RecoilTableHeader';
import { RecoilTableBody } from './RecoilTableBody';
import { Column } from './models';

interface Props {
  tableKey: string;
  columns: Column[];
  data: any[];
}

export default function RecoilTable({ tableKey, columns, data }: Props) {
  const setColumns = useSetRecoilState(columnState(tableKey));

  React.useEffect(() => {
    setColumns(columns);
  }, [columns, setColumns]);

  return (
    <TableContainer component={Paper}>
      <Table>
        <RecoilTableHeader tableKey={tableKey} />
        <RecoilTableBody tableKey={tableKey} data={data} />
      </Table>
    </TableContainer>
  );
}

export type { Column };
export { columnState };
