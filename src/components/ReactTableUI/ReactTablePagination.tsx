import TablePagination from '@material-ui/core/TablePagination';

interface Props {
  totalRowCount: number;
  page: {
    rowsPerPage: number;
    page: number;
  };
  setPage: (page: number) => void;
}

export default function RecoilTablePagination({
  totalRowCount,
  page,
  setPage,
}: Props) {
  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
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
