import React, { Component, useState } from 'react';
import AddPass from './AddPass';
import PassDisplay from './PassDisplay';

export default function PassContainer() {
  return (
    <div class='container-fluid' className='passContainer'>
      <PassDisplay />
      <AddPass/>
    </div>
  )
}