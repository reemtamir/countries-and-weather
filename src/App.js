import './App.css';
import CountriesList from './components/CountriesList';
import { useState } from 'react';
import Clock from './components/Clock';

function App() {
  const [isDark, setIsDark] = useState(false);
  const handleClick = () => {
    setIsDark(!isDark);
  };
  return (
    <>
      <div
        style={{
          backgroundColor: isDark ? 'black' : 'white',
          color: isDark ? 'red' : 'black',
        }}
        className="App vh-100% m-auto text-center"
      >
        {' '}
        <Clock />
        <h1
          style={{ color: isDark ? 'white' : 'black' }}
          className="text-center"
        >
          Countries
        </h1>
        <CountriesList />
        <button onClick={handleClick} className="btn btn-danger mt-4  ">
          {isDark ? 'Day mode' : 'Dark mode'}
        </button>
      </div>
    </>
  );
}

export default App;
