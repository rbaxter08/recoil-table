import Table from '@material-ui/core/Table';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import RecoilTableHeader from './RecoilTableHeader';
import { RecoilTableBody } from './RecoilTableBody';
import { useTable } from '../../recoil-table';
import { RecoilTablePagination } from './RecoilTablePagination';
import { Styles } from '../tableUtils';

interface Props {
  tableKey: string;
}

export default function RecoilTable({ tableKey }: Props) {
  useTable(tableKey);
  return (
    <Styles>
      <TableContainer component={Paper}>
        <Table>
          <RecoilTableHeader tableKey={tableKey} />
          <RecoilTableBody tableKey={tableKey} />
          <RecoilTablePagination tableKey={tableKey} />
        </Table>
      </TableContainer>
    </Styles>
  );
}
