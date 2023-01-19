import React, { Component, useState } from 'react';
import Register from '../components/Register';
import PassContainer from './PassContainer';


export default function Login() {
  const [login, setLogin] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    loginCheck(username, password);
  }

  const loginCheck = async (username, password) => {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ username: username, password: password }),
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
        if (data === true) setLogin(true);
        else setAttempt(true);
      })
      .catch((err) => console.log('error: ', err));
  };
  if (!login) {
    return (
      <div>
        <h2>Login:</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
          <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} ></input>
          <button>Login</button>
        </form>
        <p style={{ visibility: attempt ? 'visible' : 'hidden' }}>Incorrect password</p>
        <h2>Register:</h2>
        <Register loginCheck={loginCheck}/>
      </div>
    )
  }
  else return (
    <PassContainer/>
  )
}