import { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [serverConnectionStatus, setServerConnectionStatus] = useState('offline');
  
  async function ConnectToServer() {
    setServerConnectionStatus('connecting');
    try {
      await fetch("https://localhost:32816/WeatherForecast");
      setServerConnectionStatus('connected');
    } catch (error) {
      setServerConnectionStatus(`error: ${error}`);
    }
  }
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={ConnectToServer}>Connect to server</button>
        <p>{serverConnectionStatus}</p>
      </header>
    </div>
  );
}

export default App;
