import React from 'react';
import { useSetRecoilState } from 'recoil';
import {
  RecoilTable,
  RecoilTableBody,
  RecoilTableHeader,
  RecoilTablePagination,
} from 'recoil-table-ui';
import { useTable } from 'recoil-table';

export default function RecoilTableDemo({ tableKey, columns, data }: any) {
  const { columnAtom, dataAtom } = useTable(tableKey);
  const setData = useSetRecoilState(dataAtom);
  const setColumns = useSetRecoilState(columnAtom);

  React.useEffect(() => {
    setColumns(columns);
  }, [columns]);

  React.useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <RecoilTable>
      <RecoilTableHeader tableKey={tableKey} />
      <RecoilTableBody tableKey={tableKey} />
      <RecoilTablePagination tableKey={tableKey} />
    </RecoilTable>
  );
}
