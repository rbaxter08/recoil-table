import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Column, Page } from './models';
import { dataState, selectTotalDataLength } from './data';
import { selectRows } from './rows';
import { columnState } from './columns';
import { selectPage } from './page';
import React from 'react';

interface TableOptions<T> {
  columns?: Column[];
  data?: T[];
  page?: Page;
  manualPagination?: boolean;
}

export function useTable<T>(tableKey: string, options?: TableOptions<T>) {
  const [page, setPage] = useRecoilState(selectPage({ tableKey }));
  const setData = useSetRecoilState(dataState(tableKey));
  const totalRowCount = useRecoilValue(selectTotalDataLength({ tableKey }));
  const rows = useRecoilValue(
    selectRows({ tableKey, page, manualPagination: options?.manualPagination }),
  );
  const [columns, setColumns] = useRecoilState(columnState(tableKey));

  React.useEffect(() => {
    if (options?.columns) setColumns(options.columns);
  }, [setColumns, options?.columns]);

  React.useEffect(() => {
    if (options?.data) setData(options.data);
  }, [setData, options?.data]);

  React.useEffect(() => {
    if (options?.page) setPage({ ...options.page });
  }, [setPage, options?.page]);

  React.useEffect(() => {
    if (options?.data) setData(options.data);
  }, []);

  return React.useMemo(
    () => ({
      totalRowCount,
      rows,
      setData,
      columns,
      setColumns,
      page,
      setPage,
    }),
    [totalRowCount, rows, columns, setColumns, setData, page, setPage],
  );
}

export { columnState };
