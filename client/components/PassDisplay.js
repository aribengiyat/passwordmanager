import React, { useEffect, useState } from 'react';

export default function PassDisplay() {

  const [lists, setLists] = useState([]);

  const list = [];


  const fetchPass = (e) => {
    fetch('http://localhost:3000/data', {
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        for (const el of data) {
          list.push(<div><ul> <li> Website: {`${el.website}`}</li> <li key={`${el.username}`}> Username: {`${el.username}`}</li> <li>password: {`${el.password}`}</li></ul></div>)
        }
        setLists(list);
        e.target.reset();
      })
  }

  
  return (
    <div>
      <button class="btn btn-primary" onClick={(e) => { fetchPass(e); }}>Click for data</button>
        {lists}
    </div>
  )
}