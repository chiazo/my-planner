import React from 'react';
import './App.css';
import Header from "./header/Header";
import Main from "./main/Main";

const App = () => {
  console.log("API KEY:", process.env.REACT_APP_CLIENT_ID);
  return (
    <div>
        <Header />
        <Main/>
    </div>
  )
}

export default App;
