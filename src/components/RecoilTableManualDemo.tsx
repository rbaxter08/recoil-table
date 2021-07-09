import Button from '@material-ui/core/Button';
import RecoilTable from './RecoilTableUI';
import { useTable } from '../recoil-table';

export default function RecoilTableDemo({ tableKey, columns, data }: any) {
  const { setPage } = useTable(tableKey, {
    columns,
    data,
  });

  return (
    <div style={{ marginTop: 40 }}>
      <span>Recoil Manaul Page</span>
      <RecoilTable tableKey={tableKey} />
      <Button
        onClick={() => setPage((prev) => ({ ...prev, page: prev.page + 10 }))}
        color="primary"
        variant="contained"
      >
        Jump 10 pages
      </Button>
    </div>
  );
}
