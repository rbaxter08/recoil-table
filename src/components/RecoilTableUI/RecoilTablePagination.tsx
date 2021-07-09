import TablePagination from '@material-ui/core/TablePagination';
import { useTable } from '../../recoil-table';

export function RecoilTablePagination({ tableKey }: { tableKey: string }) {
  const { totalRowCount, page, setPage } = useTable(tableKey);

  const handleChangePage = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={totalRowCount}
      rowsPerPage={page.rowsPerPage}
      page={page.page}
      onPageChange={handleChangePage}
    />
  );
}
