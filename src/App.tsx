import { useSetRecoilState } from 'recoil';
import { columnState } from './recoil-table';
import { Button } from '@material-ui/core';
import TableDemo from './components/TableDemo';
import { getRandomColumns } from './components/tableUtils';
import './App.css';

function App() {
  const setColumns = useSetRecoilState(columnState('table1'));
  return (
    <div className="App">
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          padding: 200,
        }}
      >
        <div>
          <TableDemo tableKey="table1" />
          <div style={{ height: 100 }} />
          <TableDemo tableKey="table2" />
          <Button
            onClick={() => setColumns(getRandomColumns())}
            color="secondary"
            variant="contained"
          >
            Manually change state
          </Button>
        </div>
      </div>
    </div>
  );
}

export default App;
