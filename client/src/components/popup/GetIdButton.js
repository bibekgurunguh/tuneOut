/* global chrome*/

import React from 'react'
export default function GetIdButton({ getId }) {


  function handleClick(event) {
    console.log('button clicked :)')
    getId()
  }

  return (
    <div>
        <button className='button' onClick={handleClick}>tuneOut</button>
    </div>
  )
}
