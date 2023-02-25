import React, { Component, useState } from 'react';

export default function Register(props) {
  const [registered, setRegistered] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    register();
    setRegistered(true);
  }

  const register = () => {
    fetch('http://localhost:3000/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ username: username, password: password }),
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.error(err));
  }

  if (!registered) {
    return (
      <div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <input type="text" class="form-control" id="inlineFormInputGroup" placeholder="Username" onChange={(e) => setUsername(e.target.value)}></input>
          <input type="password" id="inputPassword5" class="form-control" onChange={(e) => setPassword(e.target.value)} ></input>
          <div class='col text-center'><button class="btn btn-primary" >Register</button></div>
        </form>
      </div>
    )
  } else return (
    <p>You have registered! Please log in</p>
  )
}