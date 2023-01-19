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
          <input type="text" placeholder="username" onChange={(e) => setUsername(e.target.value)}></input>
          <input type="text" placeholder="password" onChange={(e) => setPassword(e.target.value)} ></input>
          <button>Login</button>
        </form>
      </div>
    )
  } else return (
    <p>You have registered! Please log in</p>
  )
}