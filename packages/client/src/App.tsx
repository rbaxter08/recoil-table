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
        <RecoilTable />
      </div>
    </div>
  );
}

export default App;
