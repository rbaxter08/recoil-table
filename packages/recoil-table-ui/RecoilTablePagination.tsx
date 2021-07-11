import { useRecoilState, useRecoilValue } from 'recoil';
import TablePagination from '@material-ui/core/TablePagination';
import { useTable, Options } from 'recoil-table';

export function RecoilTablePagination({
  tableKey,
  options,
}: {
  tableKey: string;
  options: Options;
}) {
  const { pageAtom } = useTable(tableKey, options);
  const [page, setPage] = useRecoilState(pageAtom);

  const handleChangePage = (event: any, newPage: number) => {
    setPage((prev) => ({ ...prev, page: newPage }));
  };

  return (
    <TablePagination
      rowsPerPageOptions={[5, 10, 25]}
      count={page.total}
      rowsPerPage={page.rowsPerPage}
      page={page.page}
      onPageChange={handleChangePage}
    />
  );
}
