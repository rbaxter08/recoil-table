import { useRecoilState } from 'recoil';
import TablePagination from '@mui/material/TablePagination';
import { TableInstance } from 'recoil-table';

interface Props<T> {
  tableInstance: TableInstance<T>;
}

export function RecoilTablePagination<T>({ tableInstance }: Props<T>) {
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
