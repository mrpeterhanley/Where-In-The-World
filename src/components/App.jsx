import React, {useState} from 'react';
import './App.css';
import Header from "./Header";
import Main from "./Main";

function App() {

  const [darkMode, setDarkMode] = useState(true);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div className="wrapper">
      <Header mode={darkMode} setmode={toggleDarkMode}/>
      <Main mode={darkMode} setmode={toggleDarkMode} />
    </div>
  );
}

export default App;
