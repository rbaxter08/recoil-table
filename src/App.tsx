import { COLUMNS, DATA } from './components/tableUtils';
import ReactTableManualDemo from './components/ReactTableManualDemo';
import RecoilTableManualDemo from './components/RecoilTableManualDemo';
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
          {/* <RecoilTableDemo tableKey="table1" columns={COLUMNS} data={DATA} />
          <ReactTableDemo columns={COLUMNS} data={DATA} /> */}
          <RecoilTableManualDemo
            tableKey="table2"
            columns={COLUMNS}
            data={DATA}
          />
          <ReactTableManualDemo columns={COLUMNS} data={DATA} />
        </div>
      </div>
    </div>
  );
}

export default App;
