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

function TableMeta({ tableKey, options }: any) {
  const { selectedRowsAtom } = useTable(tableKey, options);
  const selectedRows = useRecoilValue(selectedRowsAtom);
  return <div>Selected Rows: {JSON.stringify(selectedRows)}</div>;
}

export default function RecoilTableDemo() {
  const tableKey = 'table1';
  const recoilTableOptions = {};
  const { columnAtom, dataAtom, pageAtom } = useTable(
    tableKey,
    recoilTableOptions,
  );
  const setData = useSetRecoilState(dataAtom);
  const setColumns = useSetRecoilState(columnAtom);
  const setPage = useSetRecoilState(pageAtom);

  React.useEffect(() => {
    setColumns([getRowSelectionCol(tableKey, recoilTableOptions), ...COLUMNS]);
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
      <TableMeta tableKey={tableKey} options={recoilTableOptions} />
      <RecoilTable>
        <RecoilTableHeader tableKey={tableKey} options={recoilTableOptions} />
        <RecoilTableBody
          tableKey={tableKey}
          options={recoilTableOptions}
          rowSelection
        />
      </RecoilTable>
      <RecoilTablePagination tableKey={tableKey} options={recoilTableOptions} />
    </Paper>
  );
}
