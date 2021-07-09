import React from 'react';
import { useRecoilValue } from 'recoil';
import { Button } from '@material-ui/core';
import RecoilTable, { columnState } from '../recoil-table';
import { getRandomColumns, getRandomData } from './tableUtils';

export default function TableDemo({ tableKey }: { tableKey: string }) {
  const tableColumns = useRecoilValue(columnState(tableKey));
  const [columns, setColumns] = React.useState(getRandomColumns());
  const [data, setData] = React.useState(getRandomData());
  return (
    <div style={{ display: 'flex' }}>
      <div style={{ width: 500 }}>
        <RecoilTable tableKey={tableKey} columns={columns} data={data} />
        <div>
          <Button
            color="primary"
            variant="contained"
            onClick={() => {
              setData(getRandomData());
              setColumns(getRandomColumns());
            }}
          >
            New Data
          </Button>
        </div>
      </div>
      <div>
        <div>
          Local State:
          <pre>{JSON.stringify(columns)}</pre>
        </div>
        <div style={{ marginTop: 40 }}>
          <span>Recoil State ({tableKey})</span>
          <pre>{JSON.stringify(tableColumns)}</pre>
        </div>
      </div>
    </div>
  );
}
