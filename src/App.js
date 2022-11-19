import './App.css';
import CountriesList from './components/CountriesList';
import { useState } from 'react';
import Trivia from './components/Trivia';
function App() {
  const [isDark, setIsDark] = useState(false);
  const handleClick = () => {
    setIsDark(!isDark);
  };
  return (
    <>
      {/* <Trivia /> */}
      <div
        style={{ backgroundColor: isDark ? 'black' : 'white' }}
        className="App vh-100 m-auto text-center"
      >
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
