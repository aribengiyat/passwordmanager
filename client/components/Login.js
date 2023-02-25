import React, { Component, useState } from 'react';
import Register from '../components/Register';
import PassContainer from './PassContainer';


export default function Login() {
  const [login, setLogin] = useState(false);
  const [attempt, setAttempt] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [register, setRegister] = useState(false);

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
        <div class='container'>
          <h2>Login:</h2>
          <div>
            <form onSubmit={(e) => handleSubmit(e)}>
              <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
              <input type="password" id="inputPassword5" class="form-control" onChange={(e) => setPassword(e.target.value)} ></input>
              <div class='col text-center'><button class="btn btn-primary" >Login</button></div>
            </form>
          </div>
          <p className='alert alert-danger' style={{ visibility: attempt ? 'visible' : 'hidden' }}>Incorrect password</p>
          <h2>Register:</h2>
          <Register loginCheck={loginCheck} />
        </div>
    )
  }
  else return (
    <PassContainer/>
  )
}


