import React from 'react';
import { useRecoilState } from 'recoil';
import { Button } from '@material-ui/core';
import { useTable } from 'recoil-table';

export function CustomPagination({ tableKey, options }: any) {
  const { pageAtom } = useTable(tableKey, options);
  const [page, setPage] = useRecoilState(pageAtom);

  return (
    <div>
      <span>curr {page.page}</span>
      <Button
        onClick={() => setPage((prev) => ({ ...prev, page: prev.page - 1 }))}
      >
        Left
      </Button>
      <Button
        onClick={() => setPage((prev) => ({ ...prev, page: prev.page + 1 }))}
      >
        Right
      </Button>
    </div>
  );
}
