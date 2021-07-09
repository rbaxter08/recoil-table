import React from 'react';
import ReactTable from './ReactTableUI';
import Button from '@material-ui/core/Button';

export default function ReactTableDemo({ columns, data }: any) {
  const [page, setPage] = React.useState(0);
  return (
    <div style={{ marginTop: 40 }}>
      <span>React Manual Page</span>
      <ReactTable
        columns={columns}
        data={data}
        localPage={page}
        onPageChange={setPage}
      />
      <Button
        onClick={() => setPage((prev) => prev + 10)}
        color="primary"
        variant="contained"
      >
        Jump 10 pages
      </Button>
    </div>
  );
}
