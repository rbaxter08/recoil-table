import { useRecoilState } from 'recoil';
import TablePagination from '@material-ui/core/TablePagination';
import { TableInstance } from 'recoil-table';

export function RecoilTablePagination<T>({
  tableInstance,
}: {
  tableInstance: TableInstance<T>;
}) {
  const [page, setPage] = useRecoilState(tableInstance.pageAtom);

  const handleChangePage = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <TablePagination
      component="div"
      style={{ display: 'inline-block', width: '100%' }}
      rowsPerPageOptions={[5, 10, 25]}
      count={page.total}
      rowsPerPage={page.rowsPerPage}
      page={page.page}
      onPageChange={handleChangePage}
    />
  );
}
