import React from 'react';
import { Paper } from '@material-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  RecoilTable,
  RecoilTableBody,
  RecoilTableHeader,
  RecoilTablePagination,
} from 'recoil-table-ui';
import { useTable } from 'recoil-table';
import { COLUMNS, asyncDataFetch } from './TableUtils';
import { getRowSelectionCol } from 'recoil-table-ui/RowSelectionColumn';

function TableMeta({ tableInstance }: any) {
  const selectedRows = useRecoilValue(tableInstance.selectedRowsAtom);
  return <div>Selected Rows: {JSON.stringify(selectedRows)}</div>;
}

export default function RecoilTableDemo() {
  const tableInstance = useTable('table1', {});
  const setData = useSetRecoilState(tableInstance.dataAtom);
  const setColumns = useSetRecoilState(tableInstance.columnAtom);
  const setPage = useSetRecoilState(tableInstance.pageAtom);

  React.useEffect(() => {
    setColumns([getRowSelectionCol(tableInstance), ...COLUMNS]);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const data = await asyncDataFetch();
      setData(data.data);
      setPage((prev) => ({ ...prev, total: data.total }));
    }
    fetchData();
  }, []);

  return (
    <Paper style={{ width: 1000 }}>
      <TableMeta tableInstance={tableInstance} />
      <RecoilTable>
        <RecoilTableHeader tableInstance={tableInstance} />
        <RecoilTableBody tableInstance={tableInstance} rowSelection />
      </RecoilTable>
      <RecoilTablePagination tableInstance={tableInstance} />
    </Paper>
  );
}
