import React, { Component, useState } from 'react';
import Login from '../components/Login';


function App() {
  const [state, setState] = useState(0);
  return (
    <Login/>
  );
}



export default App;