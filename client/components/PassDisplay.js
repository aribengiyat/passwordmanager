import React, { useEffect, useState } from 'react';

export default function PassDisplay() {

  const [lists, setLists] = useState([])

  const list = [];

  const fetchPass = () => {
    fetch('http://localhost:3000/data', {
      credentials: 'include'
    })
      .then((data) => data.json())
      .then((data) => {
        console.log(data)
        for (const el of data) {
          list.push(<p key={`${el.username}`}>Username: {`${el.username}`} password: {`${el.password}`} Website: {`${el.website}`}</p>)
        }
        setLists(list);
      })
  }
  
  return (
    <div>
      <button onClick={() => fetchPass()}>Click for data</button>
      {lists}
    </div>
  )
}