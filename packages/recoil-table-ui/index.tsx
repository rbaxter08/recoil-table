import Table from '@mui/material/Table';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
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
