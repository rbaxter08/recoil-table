import { COLUMNS, DATA } from './TableUtils';
import RecoilTable from './RecoilTable';
import './App.css';

function App() {
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
          <RecoilTable tableKey="table1" columns={COLUMNS} data={DATA} />
        </div>
      </div>
    </div>
  );
}

export default App;
