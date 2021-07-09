import React from 'react';
import { useTable, usePagination } from 'react-table';
import ReactTablePagination from './ReactTablePagination';
import Table from '@material-ui/core/Table';
import ReactTableHeader from './ReactTableHeader';
import ReactTableBody from './ReactTableBody';
import { Styles } from '../tableUtils';

function ReactTableUI({ columns, data, localPage, onPageChange }: any) {
  const {
    headerGroups,
    prepareRow,
    // @ts-ignore
    page,
    // @ts-ignore
    gotoPage,
    // @ts-ignore
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { pageIndex: 0 },
    },
    usePagination,
  );

  React.useEffect(() => {
    if (localPage) gotoPage(localPage);
  }, [localPage, gotoPage]);

  function handlePageChange(page: number) {
    onPageChange(page);
    gotoPage(page);
  }

  // Render the UI for your table
  return (
    <Styles>
      <Table>
        <ReactTableHeader headerGroups={headerGroups} />
        <ReactTableBody page={page} prepareRow={prepareRow} />
        <ReactTablePagination
          totalRowCount={data.length}
          setPage={handlePageChange}
          page={{
            page: pageIndex,
            rowsPerPage: pageSize,
          }}
        />
      </Table>
    </Styles>
  );
}

export default ReactTableUI;
