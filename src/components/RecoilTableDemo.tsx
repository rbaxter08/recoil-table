import RecoilTable from './RecoilTableUI';
import { useTable } from '../recoil-table';

export default function RecoilTableDemo({ tableKey, columns, data }: any) {
  useTable(tableKey, {
    columns,
    data,
  });

  return (
    <>
      <span style={{ marginTop: 40 }}>RecoilTable</span>
      <RecoilTable tableKey={tableKey} />
    </>
  );
}
