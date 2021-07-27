import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import { RecoilTableHeader } from './RecoilTableHeader';
import { RecoilTableBody } from './RecoilTableBody';
import { RecoilTablePagination } from './RecoilTablePagination';

function RecoilTable({ children }: any) {
  return (
    <TableContainer component={Paper}>
      <Table>{children}</Table>
    </TableContainer>
  );
}

export {
  RecoilTable,
  RecoilTableHeader,
  RecoilTableBody,
  RecoilTablePagination,
};
