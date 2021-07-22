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
          alignItems: 'center',
        }}
      >
        <RecoilTable />
      </div>
    </div>
  );
}

export default App;
