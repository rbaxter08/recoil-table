import React from 'react';
import { Paper } from '@material-ui/core';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import {
  RecoilTable,
  RecoilTableBody,
  RecoilTableHeader,
  RecoilTablePagination,
} from 'recoil-table-ui';
import { personTableInstance } from './personTableInstance';
import { COLUMNS, asyncDataFetch } from '../TableUtils';
import { getRowSelectionCol } from 'recoil-table-ui/RowSelectionColumn';

function TableMeta() {
  const selectedRows = useRecoilValue(personTableInstance.selectSelectedRows);
  return <div>Selected Rows: {JSON.stringify(selectedRows)}</div>;
}

export default function RecoilTableDemo() {
  const setData = useSetRecoilState(personTableInstance.dataAtom);
  const setColumns = useSetRecoilState(personTableInstance.columnAtom);
  const setPage = useSetRecoilState(personTableInstance.pageAtom);

  React.useEffect(() => {
    setColumns([getRowSelectionCol(personTableInstance), ...COLUMNS]);
  }, [setColumns]);

  React.useEffect(() => {
    async function fetchData() {
      const data = await asyncDataFetch();
      setData({ items: data.data, total: data.total });
      setPage((prev) => ({ ...prev, total: data.total }));
    }
    fetchData();
  }, [setPage, setData]);

  return (
    <Paper style={{ width: 1000 }}>
      <TableMeta />
      <RecoilTable>
        <RecoilTableHeader tableInstance={personTableInstance} />
        <RecoilTableBody tableInstance={personTableInstance} rowSelection />
      </RecoilTable>
      <RecoilTablePagination tableInstance={personTableInstance} />
    </Paper>
  );
}
