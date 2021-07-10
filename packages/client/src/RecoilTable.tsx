import React from 'react';
import { useSetRecoilState } from 'recoil';
import {
  RecoilTable,
  RecoilTableBody,
  RecoilTableHeader,
  RecoilTablePagination,
} from 'recoil-table-ui';
import { useTable } from 'recoil-table';
import { COLUMNS, asyncDataFetch } from './TableUtils';

export default function RecoilTableDemo() {
  const tableKey = 'table1';
  const recoilTableOptions = {};
  const { columnAtom, dataAtom } = useTable(tableKey, recoilTableOptions);
  const setData = useSetRecoilState(dataAtom);
  const setColumns = useSetRecoilState(columnAtom);

  React.useEffect(() => {
    setColumns(COLUMNS);
  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const data = await asyncDataFetch();
      setData(data);
    }
    fetchData();
  }, []);

  return (
    <RecoilTable>
      <RecoilTableHeader tableKey={tableKey} options={recoilTableOptions} />
      <RecoilTableBody tableKey={tableKey} options={recoilTableOptions} />
      <RecoilTablePagination tableKey={tableKey} options={recoilTableOptions} />
    </RecoilTable>
  );
}
