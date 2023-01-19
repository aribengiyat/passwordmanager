import React, {useState } from 'react';

export default function AddPass() {

  const [website, setWebsite] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    addPasswords();
  }

  const addPasswords = () => {
    fetch('http://localhost:3000/data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({ username: username, password: password, website: website }),
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => console.log(data));
  }


  return (
    <div>
      <form onSubmit={(e)=>handleSubmit(e)}>
        <input type="text" placeholder='Website' onChange={(e)=>setWebsite(e.target.value)}></input>
        <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} ></input>
        <input type="text" placeholder='Password' onChange={(e) => setPassword(e.target.value)}></input>
        <button>Submit</button>
      </form>
    </div>
  )
}