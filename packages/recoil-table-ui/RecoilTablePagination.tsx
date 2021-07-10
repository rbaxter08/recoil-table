import { useRecoilState } from 'recoil';
import TablePagination from '@material-ui/core/TablePagination';
import { useTable } from 'recoil-table';

export function RecoilTablePagination({ tableKey }: { tableKey: string }) {
  const { pageAtom } = useTable(tableKey);
  const [page, setPage] = useRecoilState(pageAtom);

  const handleChangePage = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={10000}
      rowsPerPage={page.rowsPerPage}
      page={page.page}
      onPageChange={handleChangePage}
    />
  );
}
