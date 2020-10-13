import React, {useState} from 'react';
import {Router} from "@reach/router"
import './App.css';
import Header from "./Header";
import Main from "./Main";
import Details from "./Details";

function App() {

  const [darkMode, setDarkMode] = useState(false);

  function toggleDarkMode() {
    setDarkMode(!darkMode);
  }

  return (
    <div>
      <Header mode={darkMode} setmode={toggleDarkMode}/>
      <Router className="wrapper">
        <Main path="/" mode={darkMode} />
        <Details path="/details/:name" mode={darkMode} />
      </Router>
    </div>
  );
}

export default App;
